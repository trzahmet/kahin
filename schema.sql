-- Kahin Ligi — Supabase şeması (tek dosya, SQL Editor'a yapıştır-çalıştır)
-- Tasarım ilkeleri (kanıt tabanlı, bkz. ../htalks-analiz/RAPOR.md):
--   * Üyelik yok: oyuncu = cihaz token'ı, yönetici = admin_secret linki
--   * Kör tahmin: maç başlayana kadar başkasının tahmini SUNUCUDA gizli
--   * Puanlama "Had Tahmin Oyunu" ruhuyla: sürprizi bilen çok kazanır
--     (gerçek bahis oranı YOK — kalabalık-oranı kullanılır; regülasyon temiz)
--   * Tablolara doğrudan erişim kapalı; her şey RPC üzerinden.

create extension if not exists pgcrypto;

-- ---------- Tablolar ----------
create table if not exists kl_leagues (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null check (slug ~ '^[a-z0-9-]{3,40}$'),
  name text not null check (char_length(name) between 3 and 60),
  admin_secret uuid not null default gen_random_uuid(),
  created_at timestamptz not null default now()
);

create table if not exists kl_players (
  id uuid primary key default gen_random_uuid(),
  league_id uuid not null references kl_leagues(id) on delete cascade,
  token uuid not null,
  name text not null check (char_length(name) between 2 and 24),
  team text not null default 'DIGER' check (team in ('BJK','FB','GS','DIGER')),
  is_host boolean not null default false,
  created_at timestamptz not null default now(),
  unique (league_id, token)
);

create table if not exists kl_matches (
  id uuid primary key default gen_random_uuid(),
  league_id uuid not null references kl_leagues(id) on delete cascade,
  home text not null,
  away text not null,
  kickoff timestamptz not null,
  score_home int,
  score_away int,
  maksimus_verdict text,   -- maç sonu yönetici hükmü: gecenin adamı
  cop_verdict text,        -- maç sonu yönetici hükmü: gecenin çöpü
  status text not null default 'open' check (status in ('open','finished')),
  created_at timestamptz not null default now()
);

create table if not exists kl_predictions (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references kl_matches(id) on delete cascade,
  player_id uuid not null references kl_players(id) on delete cascade,
  pick text not null check (pick in ('1','X','2')),
  score_home int not null check (score_home between 0 and 20),
  score_away int not null check (score_away between 0 and 20),
  maksimus text,           -- oyuncunun "Maksimüs" (MVP) kartı
  cop text,                -- oyuncunun "çöp" (flop) kartı
  maksimus_ok boolean,
  cop_ok boolean,
  points int,
  updated_at timestamptz not null default now(),
  unique (match_id, player_id)
);

-- ---------- Erişim kilidi ----------
alter table kl_leagues     enable row level security;
alter table kl_players     enable row level security;
alter table kl_matches     enable row level security;
alter table kl_predictions enable row level security;
-- RLS açık + policy yok = anon/authenticated doğrudan tablo okuyamaz/yazamaz.
revoke all on kl_leagues, kl_players, kl_matches, kl_predictions from anon, authenticated;

-- ---------- Yardımcılar ----------
create or replace function kl__league(p_slug text) returns kl_leagues
language sql stable security definer set search_path = public as $$
  select * from kl_leagues where slug = lower(p_slug)
$$;

create or replace function kl__player(p_league uuid, p_token uuid) returns kl_players
language sql stable security definer set search_path = public as $$
  select * from kl_players where league_id = p_league and token = p_token
$$;

-- ---------- RPC: lig kur ----------
create or replace function kl_create_league(p_name text, p_slug text)
returns json language plpgsql security definer set search_path = public as $$
declare l kl_leagues;
begin
  insert into kl_leagues(name, slug) values (trim(p_name), lower(trim(p_slug)))
  returning * into l;
  return json_build_object('slug', l.slug, 'name', l.name, 'admin_secret', l.admin_secret);
exception when unique_violation then
  raise exception 'Bu lig adresi (slug) alınmış, başka bir tane dene.';
end $$;

-- ---------- RPC: katıl (üyeliksiz — token cihazdan gelir) ----------
create or replace function kl_join(p_slug text, p_token uuid, p_name text, p_team text)
returns json language plpgsql security definer set search_path = public as $$
declare l kl_leagues; pl kl_players;
begin
  l := kl__league(p_slug);
  if l.id is null then raise exception 'Lig bulunamadı.'; end if;
  insert into kl_players(league_id, token, name, team)
  values (l.id, p_token, trim(p_name), coalesce(nullif(upper(p_team),''),'DIGER'))
  on conflict (league_id, token)
  do update set name = excluded.name, team = excluded.team
  returning * into pl;
  return json_build_object('player_id', pl.id, 'name', pl.name, 'team', pl.team,
                           'is_host', pl.is_host, 'league_name', l.name);
end $$;

-- ---------- RPC: fikstür + kendi tahminlerim ----------
create or replace function kl_fixtures(p_slug text, p_token uuid)
returns json language plpgsql stable security definer set search_path = public as $$
declare l kl_leagues; me kl_players;
begin
  l := kl__league(p_slug);
  if l.id is null then raise exception 'Lig bulunamadı.'; end if;
  me := kl__player(l.id, p_token);
  return coalesce((
    select json_agg(row_to_json(r) order by r.kickoff)
    from (
      select m.id, m.home, m.away, m.kickoff, m.status, m.score_home, m.score_away,
             m.maksimus_verdict, m.cop_verdict,
             (m.kickoff <= now()) as locked,
             (select count(*) from kl_predictions p where p.match_id = m.id) as n_predictions,
             (select row_to_json(x) from (
                select p.pick, p.score_home, p.score_away, p.maksimus, p.cop,
                       p.points, p.maksimus_ok, p.cop_ok
                from kl_predictions p
                where p.match_id = m.id and p.player_id = me.id
             ) x) as mine
      from kl_matches m where m.league_id = l.id
    ) r
  ), '[]'::json);
end $$;

-- ---------- RPC: tahmin gönder (maç başlamadan; sonrası kilit) ----------
create or replace function kl_predict(p_slug text, p_token uuid, p_match uuid,
                                      p_pick text, p_sh int, p_sa int,
                                      p_maksimus text default null, p_cop text default null)
returns json language plpgsql security definer set search_path = public as $$
declare l kl_leagues; me kl_players; m kl_matches;
begin
  l := kl__league(p_slug);
  me := kl__player(l.id, p_token);
  if me.id is null then raise exception 'Önce lige katıl.'; end if;
  select * into m from kl_matches where id = p_match and league_id = l.id;
  if m.id is null then raise exception 'Maç bulunamadı.'; end if;
  if m.kickoff <= now() then raise exception 'Maç başladı — tahminler kilitli (kör tahmin kuralı).'; end if;
  insert into kl_predictions(match_id, player_id, pick, score_home, score_away, maksimus, cop)
  values (m.id, me.id, p_pick, p_sh, p_sa, nullif(trim(p_maksimus),''), nullif(trim(p_cop),''))
  on conflict (match_id, player_id) do update
    set pick = excluded.pick, score_home = excluded.score_home, score_away = excluded.score_away,
        maksimus = excluded.maksimus, cop = excluded.cop, updated_at = now();
  return json_build_object('ok', true);
end $$;

-- ---------- RPC: yüzleşme (maç başladıysa HERKESİN tahmini açılır) ----------
create or replace function kl_reveal(p_slug text, p_match uuid)
returns json language plpgsql stable security definer set search_path = public as $$
declare l kl_leagues; m kl_matches;
begin
  l := kl__league(p_slug);
  select * into m from kl_matches where id = p_match and league_id = l.id;
  if m.id is null then raise exception 'Maç bulunamadı.'; end if;
  if m.kickoff > now() then raise exception 'Maç başlamadan tahminler açılmaz.'; end if;
  return coalesce((
    select json_agg(row_to_json(r) order by r.is_host desc, r.points desc nulls last, r.name)
    from (
      select pl.name, pl.team, pl.is_host, p.pick, p.score_home, p.score_away,
             p.maksimus, p.cop, p.points, p.maksimus_ok, p.cop_ok
      from kl_predictions p join kl_players pl on pl.id = p.player_id
      where p.match_id = m.id
    ) r
  ), '[]'::json);
end $$;

-- ---------- RPC: liderlik (ekip vs chat + taraftar kırılımı) ----------
create or replace function kl_leaderboard(p_slug text)
returns json language plpgsql stable security definer set search_path = public as $$
declare l kl_leagues;
begin
  l := kl__league(p_slug);
  if l.id is null then raise exception 'Lig bulunamadı.'; end if;
  return json_build_object(
    'players', coalesce((
      select json_agg(row_to_json(r) order by r.total desc, r.name)
      from (
        select pl.name, pl.team, pl.is_host,
               coalesce(sum(p.points), 0)::int as total,
               count(p.points) as scored_matches
        from kl_players pl
        left join kl_predictions p on p.player_id = pl.id and p.points is not null
        where pl.league_id = l.id
        group by pl.id
      ) r), '[]'::json),
    'ekip_vs_chat', (
      select json_build_object(
        'ekip',  coalesce(avg(case when pl.is_host then s.total end), 0)::numeric(10,1),
        'chat',  coalesce(avg(case when not pl.is_host then s.total end), 0)::numeric(10,1),
        'chat_n', count(*) filter (where not pl.is_host))
      from kl_players pl
      left join lateral (
        select coalesce(sum(p.points),0) as total
        from kl_predictions p where p.player_id = pl.id
      ) s on true
      where pl.league_id = l.id),
    'takim_kirilimi', coalesce((
      select json_object_agg(team, cnt) from (
        select team, count(*) as cnt from kl_players
        where league_id = l.id group by team
      ) t), '{}'::json)
  );
end $$;

-- ---------- Puanlama (Had ruhu: sürprizi bilen çok kazanır) ----------
-- Doğru 1X2: 10 x kalabalık çarpanı (herkes bildiyse x1, azınlık bildiyse x3'e kadar)
-- Fark bonusu: +5 (gol farkını tutturmak) | Birebir skor: +10
-- Maksimüs hükmü tutan: +5 | Çöp hükmü tutan: +5
create or replace function kl__score_match(p_match uuid)
returns void language plpgsql security definer set search_path = public as $$
declare
  m kl_matches;
  outcome text;
  n_total int;
  n_same int;
  mult numeric;
begin
  select * into m from kl_matches where id = p_match;
  outcome := case when m.score_home > m.score_away then '1'
                  when m.score_home = m.score_away then 'X'
                  else '2' end;
  select count(*) into n_total from kl_predictions where match_id = m.id;
  select count(*) into n_same from kl_predictions where match_id = m.id and pick = outcome;
  mult := case when n_same = 0 then 1
               else least(3.0, greatest(1.0, n_total::numeric / n_same)) end;
  update kl_predictions p set
    maksimus_ok = case when m.maksimus_verdict is null or p.maksimus is null then null
                       else lower(trim(p.maksimus)) = lower(trim(m.maksimus_verdict)) end,
    cop_ok      = case when m.cop_verdict is null or p.cop is null then null
                       else lower(trim(p.cop)) = lower(trim(m.cop_verdict)) end,
    points =
        (case when p.pick = outcome then round(10 * mult)::int else 0 end)
      + (case when (p.score_home - p.score_away) = (m.score_home - m.score_away) then 5 else 0 end)
      + (case when p.score_home = m.score_home and p.score_away = m.score_away then 10 else 0 end)
      + (case when m.maksimus_verdict is not null and p.maksimus is not null
                   and lower(trim(p.maksimus)) = lower(trim(m.maksimus_verdict)) then 5 else 0 end)
      + (case when m.cop_verdict is not null and p.cop is not null
                   and lower(trim(p.cop)) = lower(trim(m.cop_verdict)) then 5 else 0 end)
  where p.match_id = m.id;
end $$;

-- ---------- Yönetici RPC'leri (admin_secret ile) ----------
create or replace function kl__check_admin(p_slug text, p_secret uuid) returns kl_leagues
language plpgsql stable security definer set search_path = public as $$
declare l kl_leagues;
begin
  l := kl__league(p_slug);
  if l.id is null or l.admin_secret <> p_secret then
    raise exception 'Yönetici anahtarı geçersiz.';
  end if;
  return l;
end $$;

create or replace function kl_admin_add_match(p_slug text, p_secret uuid,
                                              p_home text, p_away text, p_kickoff timestamptz)
returns json language plpgsql security definer set search_path = public as $$
declare l kl_leagues; m kl_matches;
begin
  l := kl__check_admin(p_slug, p_secret);
  insert into kl_matches(league_id, home, away, kickoff)
  values (l.id, trim(p_home), trim(p_away), p_kickoff) returning * into m;
  return json_build_object('id', m.id);
end $$;

create or replace function kl_admin_result(p_slug text, p_secret uuid, p_match uuid,
                                           p_sh int, p_sa int,
                                           p_maksimus text default null, p_cop text default null)
returns json language plpgsql security definer set search_path = public as $$
declare l kl_leagues;
begin
  l := kl__check_admin(p_slug, p_secret);
  update kl_matches set score_home = p_sh, score_away = p_sa,
         maksimus_verdict = nullif(trim(p_maksimus),''),
         cop_verdict = nullif(trim(p_cop),''), status = 'finished'
  where id = p_match and league_id = l.id;
  if not found then raise exception 'Maç bulunamadı.'; end if;
  perform kl__score_match(p_match);
  return json_build_object('ok', true);
end $$;

create or replace function kl_admin_set_host(p_slug text, p_secret uuid,
                                             p_player_name text, p_is_host boolean)
returns json language plpgsql security definer set search_path = public as $$
declare l kl_leagues; n int;
begin
  l := kl__check_admin(p_slug, p_secret);
  update kl_players set is_host = p_is_host
  where league_id = l.id and lower(name) = lower(trim(p_player_name));
  get diagnostics n = row_count;
  if n = 0 then raise exception 'Bu isimde oyuncu yok.'; end if;
  return json_build_object('updated', n);
end $$;

create or replace function kl_admin_delete_match(p_slug text, p_secret uuid, p_match uuid)
returns json language plpgsql security definer set search_path = public as $$
declare l kl_leagues;
begin
  l := kl__check_admin(p_slug, p_secret);
  delete from kl_matches where id = p_match and league_id = l.id;
  return json_build_object('ok', true);
end $$;

-- RPC'leri anon'a aç (tablolar kapalı kalır)
grant execute on function
  kl_create_league(text, text),
  kl_join(text, uuid, text, text),
  kl_fixtures(text, uuid),
  kl_predict(text, uuid, uuid, text, int, int, text, text),
  kl_reveal(text, uuid),
  kl_leaderboard(text),
  kl_admin_add_match(text, uuid, text, text, timestamptz),
  kl_admin_result(text, uuid, uuid, int, int, text, text),
  kl_admin_set_host(text, uuid, text, boolean),
  kl_admin_delete_match(text, uuid, uuid)
to anon;

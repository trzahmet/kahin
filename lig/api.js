// Kahin Ligi API katmanı — gerçek mod (Supabase RPC) + demo mod (localStorage).
// Tüm sayfalar yalnızca KL.api.* fonksiyonlarını kullanır; iki mod aynı sözleşmeyi uygular.
(function () {
  const cfg = window.KL_CONFIG || {};
  const DEMO = !cfg.SUPABASE_URL || !cfg.SUPABASE_ANON_KEY;

  // ---- ortak yardımcılar ----
  function uuid() {
    return crypto.randomUUID ? crypto.randomUUID() :
      "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0, v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
  }
  function deviceToken() {
    let t = localStorage.getItem("kl_token");
    if (!t) { t = uuid(); localStorage.setItem("kl_token", t); }
    return t;
  }

  // ---- gerçek mod: Supabase PostgREST RPC (SDK'sız, tek fetch) ----
  async function rpc(fn, args) {
    const res = await fetch(`${cfg.SUPABASE_URL}/rest/v1/rpc/${fn}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        apikey: cfg.SUPABASE_ANON_KEY,
        authorization: `Bearer ${cfg.SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(args || {}),
    });
    const body = await res.json().catch(() => null);
    if (!res.ok) {
      const msg = body && (body.message || body.hint || body.details) || `Sunucu hatası (${res.status})`;
      throw new Error(msg.replace(/^.*?: /, ""));
    }
    return body;
  }

  // ---- demo mod: SQL semantiğinin birebir tarayıcı kopyası ----
  const DB_KEY = "kl_demo_db";
  function db() {
    let d = JSON.parse(localStorage.getItem(DB_KEY) || "null");
    if (!d) { d = seed(); localStorage.setItem(DB_KEY, JSON.stringify(d)); }
    return d;
  }
  function save(d) { localStorage.setItem(DB_KEY, JSON.stringify(d)); }

  function seed() {
    const now = Date.now(), H = 3600e3;
    const league = { slug: "demo", name: "Kahin Ligi — Demo", admin_secret: "demo-admin" };
    const mk = (home, away, dt, fin) => ({
      id: uuid(), home, away, kickoff: new Date(dt).toISOString(),
      score_home: fin ? fin[0] : null, score_away: fin ? fin[1] : null,
      maksimus_verdict: fin ? fin[2] : null, cop_verdict: fin ? fin[3] : null,
      status: fin ? "finished" : "open",
    });
    const matches = [
      mk("Arjantin", "İspanya", now - 26 * H, [2, 1, "Messi", "Rodri"]),
      mk("Brezilya", "Fransa", now - 3 * H, null),          // başladı: kilitli, yüzleşme açık
      mk("Türkiye", "Almanya", now + 20 * H, null),         // açık
      mk("İngiltere", "Portekiz", now + 44 * H, null),
    ];
    const P = (name, team, is_host) => ({ id: uuid(), token: uuid(), name, team, is_host });
    const players = [
      P("Hasan", "BJK", true), P("Turancan", "FB", true), P("Hilmi", "GS", true),
      P("kahin_ferdi", "GS", false), P("temkinli61", "FB", false),
      P("karakartal_06", "BJK", false), P("passolig_magduru", "DIGER", false),
    ];
    const preds = [];
    const pr = (pi, mi, pick, sh, sa, maks, cop) =>
      preds.push({ id: uuid(), match_id: matches[mi].id, player_id: players[pi].id,
                   pick, score_home: sh, score_away: sa, maksimus: maks || null,
                   cop: cop || null, points: null, maksimus_ok: null, cop_ok: null });
    // biten maç tahminleri (puanlama seed sonrası çalıştırılır)
    pr(0, 0, "1", 2, 1, "Messi", "Carvajal"); pr(1, 0, "X", 1, 1, "Pedri", "Otamendi");
    pr(2, 0, "2", 0, 2, "Lamine Yamal", "Romero"); pr(3, 0, "1", 3, 1, "Messi", "Rodri");
    pr(4, 0, "1", 1, 0, "Alvarez", "Le Normand"); pr(5, 0, "X", 2, 2, "Messi", "Rodri");
    // başlamış maç (yüzleşme ekranı için)
    pr(0, 1, "1", 2, 0, "Vinicius", "Mbappe"); pr(1, 1, "2", 1, 3, "Mbappe", "Casemiro");
    pr(2, 1, "1", 2, 1, "Rodrygo", "Giroud"); pr(3, 1, "2", 0, 1, "Griezmann", "Neymar");
    pr(6, 1, "X", 1, 1, "Marquinhos", "Dembele");
    const d = { league, matches, players, predictions: preds };
    scoreMatch(d, matches[0].id);
    return d;
  }

  function scoreMatch(d, matchId) {
    const m = d.matches.find(x => x.id === matchId);
    const outcome = m.score_home > m.score_away ? "1" : m.score_home === m.score_away ? "X" : "2";
    const ps = d.predictions.filter(p => p.match_id === matchId);
    const nSame = ps.filter(p => p.pick === outcome).length;
    const mult = nSame === 0 ? 1 : Math.min(3, Math.max(1, ps.length / nSame));
    const eq = (a, b) => a && b && a.trim().toLowerCase() === b.trim().toLowerCase();
    for (const p of ps) {
      p.maksimus_ok = m.maksimus_verdict && p.maksimus ? eq(p.maksimus, m.maksimus_verdict) : null;
      p.cop_ok = m.cop_verdict && p.cop ? eq(p.cop, m.cop_verdict) : null;
      p.points =
        (p.pick === outcome ? Math.round(10 * mult) : 0) +
        ((p.score_home - p.score_away) === (m.score_home - m.score_away) ? 5 : 0) +
        (p.score_home === m.score_home && p.score_away === m.score_away ? 10 : 0) +
        (p.maksimus_ok ? 5 : 0) + (p.cop_ok ? 5 : 0);
    }
  }

  const demoApi = {
    async create_league(name, slug) {
      const d = db();
      if (d.league.slug === slug) throw new Error("Bu lig adresi (slug) alınmış, başka bir tane dene.");
      d.league = { slug, name, admin_secret: uuid() };
      d.matches = []; d.players = []; d.predictions = [];
      save(d);
      return { slug, name, admin_secret: d.league.admin_secret };
    },
    async join(slug, token, name, team) {
      const d = db();
      let pl = d.players.find(p => p.token === token);
      if (pl) { pl.name = name; pl.team = team; }
      else { pl = { id: uuid(), token, name, team: team || "DIGER", is_host: false }; d.players.push(pl); }
      save(d);
      return { player_id: pl.id, name: pl.name, team: pl.team, is_host: pl.is_host, league_name: d.league.name };
    },
    async fixtures(slug, token) {
      const d = db();
      const me = d.players.find(p => p.token === token);
      return d.matches
        .slice().sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff))
        .map(m => {
          const mine = me && d.predictions.find(p => p.match_id === m.id && p.player_id === me.id);
          return { ...m, locked: new Date(m.kickoff) <= new Date(),
                   n_predictions: d.predictions.filter(p => p.match_id === m.id).length,
                   mine: mine ? { pick: mine.pick, score_home: mine.score_home, score_away: mine.score_away,
                                  maksimus: mine.maksimus, cop: mine.cop, points: mine.points,
                                  maksimus_ok: mine.maksimus_ok, cop_ok: mine.cop_ok } : null };
        });
    },
    async predict(slug, token, match, pick, sh, sa, maksimus, cop) {
      const d = db();
      const me = d.players.find(p => p.token === token);
      if (!me) throw new Error("Önce lige katıl.");
      const m = d.matches.find(x => x.id === match);
      if (!m) throw new Error("Maç bulunamadı.");
      if (new Date(m.kickoff) <= new Date()) throw new Error("Maç başladı — tahminler kilitli (kör tahmin kuralı).");
      let p = d.predictions.find(x => x.match_id === match && x.player_id === me.id);
      if (!p) { p = { id: uuid(), match_id: match, player_id: me.id }; d.predictions.push(p); }
      Object.assign(p, { pick, score_home: sh, score_away: sa,
                         maksimus: maksimus || null, cop: cop || null,
                         points: null, maksimus_ok: null, cop_ok: null });
      save(d);
      return { ok: true };
    },
    async reveal(slug, match) {
      const d = db();
      const m = d.matches.find(x => x.id === match);
      if (!m) throw new Error("Maç bulunamadı.");
      if (new Date(m.kickoff) > new Date()) throw new Error("Maç başlamadan tahminler açılmaz.");
      return d.predictions.filter(p => p.match_id === match).map(p => {
        const pl = d.players.find(x => x.id === p.player_id);
        return { name: pl.name, team: pl.team, is_host: pl.is_host, pick: p.pick,
                 score_home: p.score_home, score_away: p.score_away,
                 maksimus: p.maksimus, cop: p.cop, points: p.points,
                 maksimus_ok: p.maksimus_ok, cop_ok: p.cop_ok };
      }).sort((a, b) => (b.is_host - a.is_host) || (b.points || 0) - (a.points || 0));
    },
    async leaderboard(slug) {
      const d = db();
      const totals = d.players.map(pl => {
        const rows = d.predictions.filter(p => p.player_id === pl.id && p.points != null);
        return { name: pl.name, team: pl.team, is_host: pl.is_host,
                 total: rows.reduce((s, p) => s + p.points, 0), scored_matches: rows.length };
      }).sort((a, b) => b.total - a.total || a.name.localeCompare(b.name, "tr"));
      const ekip = totals.filter(t => t.is_host), chat = totals.filter(t => !t.is_host);
      const avg = a => a.length ? +(a.reduce((s, t) => s + t.total, 0) / a.length).toFixed(1) : 0;
      const teams = {};
      d.players.forEach(p => { teams[p.team] = (teams[p.team] || 0) + 1; });
      return { players: totals,
               ekip_vs_chat: { ekip: avg(ekip), chat: avg(chat), chat_n: chat.length },
               takim_kirilimi: teams };
    },
    async admin_add_match(slug, secret, home, away, kickoff) {
      const d = db();
      if (d.league.admin_secret !== secret) throw new Error("Yönetici anahtarı geçersiz.");
      const m = { id: uuid(), home, away, kickoff, score_home: null, score_away: null,
                  maksimus_verdict: null, cop_verdict: null, status: "open" };
      d.matches.push(m); save(d);
      return { id: m.id };
    },
    async admin_result(slug, secret, match, sh, sa, maksimus, cop) {
      const d = db();
      if (d.league.admin_secret !== secret) throw new Error("Yönetici anahtarı geçersiz.");
      const m = d.matches.find(x => x.id === match);
      if (!m) throw new Error("Maç bulunamadı.");
      Object.assign(m, { score_home: sh, score_away: sa, status: "finished",
                         maksimus_verdict: maksimus || null, cop_verdict: cop || null });
      scoreMatch(d, match); save(d);
      return { ok: true };
    },
    async admin_set_host(slug, secret, playerName, isHost) {
      const d = db();
      if (d.league.admin_secret !== secret) throw new Error("Yönetici anahtarı geçersiz.");
      const hits = d.players.filter(p => p.name.toLowerCase() === playerName.trim().toLowerCase());
      if (!hits.length) throw new Error("Bu isimde oyuncu yok.");
      hits.forEach(p => { p.is_host = isHost; }); save(d);
      return { updated: hits.length };
    },
    async admin_delete_match(slug, secret, match) {
      const d = db();
      if (d.league.admin_secret !== secret) throw new Error("Yönetici anahtarı geçersiz.");
      d.matches = d.matches.filter(m => m.id !== match);
      d.predictions = d.predictions.filter(p => p.match_id !== match);
      save(d);
      return { ok: true };
    },
  };

  const realApi = {
    create_league: (name, slug) => rpc("kl_create_league", { p_name: name, p_slug: slug }),
    join: (slug, token, name, team) => rpc("kl_join", { p_slug: slug, p_token: token, p_name: name, p_team: team }),
    fixtures: (slug, token) => rpc("kl_fixtures", { p_slug: slug, p_token: token }),
    predict: (slug, token, match, pick, sh, sa, maksimus, cop) =>
      rpc("kl_predict", { p_slug: slug, p_token: token, p_match: match, p_pick: pick,
                          p_sh: sh, p_sa: sa, p_maksimus: maksimus, p_cop: cop }),
    reveal: (slug, match) => rpc("kl_reveal", { p_slug: slug, p_match: match }),
    leaderboard: (slug) => rpc("kl_leaderboard", { p_slug: slug }),
    admin_add_match: (slug, secret, home, away, kickoff) =>
      rpc("kl_admin_add_match", { p_slug: slug, p_secret: secret, p_home: home, p_away: away, p_kickoff: kickoff }),
    admin_result: (slug, secret, match, sh, sa, maksimus, cop) =>
      rpc("kl_admin_result", { p_slug: slug, p_secret: secret, p_match: match, p_sh: sh, p_sa: sa,
                               p_maksimus: maksimus, p_cop: cop }),
    admin_set_host: (slug, secret, playerName, isHost) =>
      rpc("kl_admin_set_host", { p_slug: slug, p_secret: secret, p_player_name: playerName, p_is_host: isHost }),
    admin_delete_match: (slug, secret, match) =>
      rpc("kl_admin_delete_match", { p_slug: slug, p_secret: secret, p_match: match }),
  };

  window.KL = { DEMO, api: DEMO ? demoApi : realApi, deviceToken, uuid };
})();

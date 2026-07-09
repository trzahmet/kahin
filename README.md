# Kahin Ligi

Üyeliksiz, yayın-dostu tahmin ligi. **Sürprizi bilen çok kazanır.**

Yayıncı ekipler için tasarlandı: ekip + izleyiciler maç başlamadan tahmin kilitler
(kör tahmin), maç başlayınca herkesin kartı açılır (yüzleşme), sonuç girilince
puanlar otomatik hesaplanır, liderlik tablosu yayın ekranına atılır.

## Neden böyle? (kanıta dayalı tasarım kuralları)

Tasarım şartnamesi `../htalks-analiz/RAPOR.md`'deki 61 yayınlık analizden geliyor:

| Kural | Kanıt |
|---|---|
| Üyelik yok (oyuncu=cihaz, yönetici=gizli link) | "Web sitesine üye olma varsa kullanmam" — yayında açık veto |
| Kör tahmin (maça kadar sunucuda gizli) | "hile yapıyorsun" şüphesi + sözlü tarif edilen ihtiyaç |
| Oran-parası YOK, kalabalık çarpanı VAR | Had Tahmin Oyunu'nun ruhu, bahis regülasyonuna girmeden |
| ⭐Maksimüs / 🗑️Çöp kartları | Her maçta oynanan mevcut ritüel |
| Ekip-vs-Chat karşılaştırması | "chat host'lardan hızlı" — ölçülemeyen rekabet |
| Taraftar kırılımı (BJK/FB/GS) | Kanal dinamiğinin temeli |
| Tek ekran TV görünümü | Excel ekran paylaşımı fiyaskoları |

## Puanlama

- Doğru 1X2: **10 × kalabalık çarpanı** — o sonucu seçenlerin oranına göre 1.0–3.0
  (herkes bildiyse 10, %33 bildiyse 30'a kadar).
- Gol farkını tutturma: **+5**
- Birebir skor: **+10**
- ⭐ Maksimüs hükmü tutan: **+5** · 🗑️ Çöp hükmü tutan: **+5**
  (hükümleri maç sonu yönetici verir — yüzleşme anı yayının kendisidir)

## Kurulum (bir kere, ~5 dakika)

1. **Supabase** → SQL Editor → `schema.sql` içeriğini yapıştır, çalıştır.
2. `config.js` → `SUPABASE_URL` ve `SUPABASE_ANON_KEY` doldur
   (Project Settings → API; anon key herkese açık olabilir, tablolar RPC-kilitli).
3. Bu klasörü herhangi bir statik hosta koy (GitHub Pages / Cloudflare Pages / Netlify).
   Derleme yok; dosyaları kopyalamak yeterli.

`config.js` boş bırakılırsa site **DEMO modunda** açılır (veri tarayıcıda kalır) —
ürünü göstermek/denemek için sunucu bile gerekmez.

## Kullanım

- `admin.html` → lig kur → **yönetici linkini kaydet** → maçları ekle.
- Oyuncular `index.html?lig=<slug>` → isim yaz, tahmin kilitle.
- Yayın ekranı: `tv.html?lig=<slug>` (OBS pencere kaynağı, 10 sn'de bir yenilenir).
- Maç bitince `admin.html` → skor + ⭐/🗑️ hükümleri → "Sonucu işle".

## Güvenlik modeli

- Tüm tablolar RLS ile kapalı; istemci yalnızca `security definer` RPC çağırır.
- Tahminler maç saatinden önce hiçbir RPC'den sızmaz (kör tahmin sunucuda).
- Yönetici yetkisi = lig kurulurken üretilen `admin_secret` (linkte taşınır).
- Gerçek para/ödül/oran yok — puan bazlı eğlence ürünü.

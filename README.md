# HTalks Evreni

Kanalın 2.124 videosunu (1.904 saat) analiz eden bir boru hattının ürettiği, tek çatı altında yaşayan modüller. Resmi HTalks sayfası değildir.

**Canlı site:** https://trzahmet.github.io/htalks/

## Modüller

| Modül | Yol | Durum | Ne yapar |
|---|---|---|---|
| Tahmin Sicili — DK Karnesi | `sicil/` | **CANLI** | Üçlünün DK-2026 tahmin karnesi: ödüller, kişi karneleri, şampiyon kumarı, filtrelenebilir tam kayıt listesi. Her yayından sonra güncellenir. |
| Uwufufu — Cümle Arası Kapışmalar | `uwufufu/` | CANLI | Laf arasında ele verilen tercihlerden çıkan 30 versus turnuvası (32 veya 64 yarışmacılı). |
| HTalks Wrapped | `wrapped/htalks.html` | CANLI | Arşiv sayılarının sinematik gösterimi. |
| Uçak Yayını Simülatörü | `ucak-yayini/` | CANLI | "Piyasa değeri × Instagram ≥ 25" formülüyle transfer tahmin oyunu; aynı ekrandan 1-6 kişi. |
| Kaçı Bildin? | `izlenme/` | CANLI | İki video, hangisi daha çok izlendi — gerçek YouTube verisiyle tahmin oyunu. |
| En Çok İzlenenler | `izlenme/istatistik.html` | CANLI | Top 50 liste, yıllara göre büyüme, format kırılımı. |

## Veri ve dürüstlük ilkeleri

- Transkriptlerden **birebir alıntı yapılmaz** — özet + kaynak yayın linki.
- Kişi ataması yalnız bağlam kanıtıyla; kanıtı zayıf kayıtlar kişiye yazılmaz.
- Hükümler (TUTTU/KISMEN/ÇÖKTÜ) yayınlarda söylenen sonuçlara dayanır; her kartta kaynak var.
- Maç görüntüsü, kulüp/beIN materyali kullanılmaz.

## Teknik

Tamamen statik site (GitHub Pages). Sicil verisi `sicil/data.js` içinde; üretim boru hattı ayrı depodadır ve her yeni yayından sonra bu dosyayı günceller.

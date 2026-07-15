# HTalks Evreni — bağımsız hayran modülleri

Kanalın 2.124 videosunu (1.904 saat) analiz eden bir boru hattının ürettiği, tek çatı altında yaşayan modüller. Bağımsız hayran çalışmasıdır; HTalks ile resmi bağı yoktur.

**Canlı site:** https://trzahmet.github.io/kahin/

## Modüller

| Modül | Yol | Durum | Ne yapar |
|---|---|---|---|
| Tahmin Sicili | `sicil/` | **CANLI** | Üçlünün DK-2026 tahmin karnesi: kim ne dedi, ne tuttu, ne çöktü. Her yayından sonra güncellenir. |
| DK Karnesi — Ödüller | `sicil/karne.html` | CANLI | Üçlünün Dünya Kupası karnesi ödül sayfası: en büyük sıçış, kâhin anı, en cesur çağrı. |
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

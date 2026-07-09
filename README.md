# HTalks Evreni — bağımsız hayran modülleri

Kanalın 2.124 videosunu (1.904 saat) analiz eden bir boru hattının ürettiği, tek çatı altında yaşayan modüller. Bağımsız hayran çalışmasıdır; HTalks ile resmi bağı yoktur.

**Canlı site:** https://networkailab01-web.github.io/kahin/

## Modüller

| Modül | Yol | Durum | Ne yapar |
|---|---|---|---|
| Tahmin Sicili | `sicil/` | **CANLI** | Üçlünün DK-2026 tahmin karnesi: kim ne dedi, ne tuttu, ne çöktü. Her yayından sonra güncellenir. |
| HTalks Wrapped | `wrapped/` | CANLI | Arşiv sayılarının sinematik gösterimi. |
| ARŞİV Oyunu | `demo/arsiv.html` | DEMO | Kanal hafızasına karşı yarışma prototipi. |
| VS Arena | — | YAKINDA | Küratörlü, güncel versus paketleri + yayın TV modu. |
| Günün Sorusu | — | YAKINDA | Arşivden günde tek soru; seri + paylaşım kartı. |
| Kahin Ligi (park) | `lig/` | PARK | Eski tahmin-ligi uygulaması; altyapısı VS Arena'nın canlı moduna devşirilecek. |

## Veri ve dürüstlük ilkeleri

- Transkriptlerden **birebir alıntı yapılmaz** — özet + kaynak yayın linki.
- Kişi ataması yalnız bağlam kanıtıyla; kanıtı zayıf kayıtlar kişiye yazılmaz.
- Hükümler (TUTTU/KISMEN/ÇÖKTÜ) yayınlarda söylenen sonuçlara dayanır; her kartta kaynak var.
- Maç görüntüsü, kulüp/beIN materyali kullanılmaz.

## Teknik

Tamamen statik site (GitHub Pages). Sicil verisi `sicil/data.js` içinde; üretim boru hattı ayrı depodadır ve her yeni yayından sonra bu dosyayı günceller.

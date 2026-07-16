# HTalks Evreni — proje kuralları

Bağımsız, resmi olmayan bir fan sitesi: HTalks YouTube kanalı etrafında statik mini
uygulamalar (GitHub Pages üzerinde yayında). Bu dosya, bu repoda çalışan AI asistanının
uyması gereken kuralları tanımlar. Kaynak çerçeve:
[ai-engineering-os](https://github.com/trzahmet/ai-engineering-os).

## İletişim ve dil

- Kullanıcıyla **Türkçe** konuş; kısa ve doğrudan ol.
- Kod, dosya adları, commit mesajları, PR başlıkları **İngilizce**. Site içeriği (HTML
  metinleri) Türkçe'dir ve öyle kalır — bu ikisini karıştırma.

## Mimari gerçekler

- **Saf statik site:** build sistemi, framework, package.json yok — bilerek. Ekleme.
- Her modül kendi klasöründe, tek `index.html` + veri `.js` dosyası olarak yaşar
  (`sicil/`, `uwufufu/`, `izlenme/`, `ucak-yayini/`, `wrapped/`).
- `sicil/data.js` dış bir üretim hattı tarafından her yayın sonrası yenilenir — elle
  düzenleme; formatını değiştireceksen üretim hattıyla uyumu doğrula.
- Deploy: `.github/workflows/pages.yml` → GitHub Pages. Yeni CI adımı eklerken bu
  workflow'u bozmadığını kontrol et.

## Bu repoya özgü kırmızı çizgiler

- **Bu repo herkese açık (public).** Hiçbir koşulda sır, API anahtarı, kişisel veri
  commit'leme; şüphelendiğinde durup sor.
- **İçerik etiği (README'deki kurallar bağlayıcıdır):** transkriptlerden birebir alıntı
  yok, yalnızca kaynak linkli özet; kulüp/beIN maç görüntüsü yok.
- **Görsel lisansları:** `uwufufu/img/KREDILER.md` ve `_krediler.json` her görselin
  kaynağını/lisansını izler. Yeni görsel eklerken bu kayıtları aynı değişiklikte güncelle —
  kaydı olmayan görsel ekleme.

## Çalışma kuralları (özet)

- Öncelik sırası: doğruluk → güvenlik → basitlik → sürdürülebilirlik. Statik siteye
  "modernleştirme" adına karmaşıklık ekleme.
- Değiştirmeden önce oku; en küçük doğru değişikliği yap; test/dogrulama olarak sayfaları
  tarayıcıda (veya en azından HTML doğrulamasıyla) kontrol etmeden "çalışıyor" deme.
- Kullanıcı açıkça istemedikçe commit/push yapma; force-push ve history rewrite yasak.

// Uçak Yayını Simülatörü — kadro verisi
// Tüm veriler 14 Temmuz 2026'da webden doğrulandı (kaynak URL'leri her kayıtta).
// Kadro kuralı: Türkiye'de (Süper Lig'de) OYNAMIŞ hiç kimse listede yok —
// oyun "Türkiye'ye İLK kez uçakla gelse açılır mı?" sorusunu soruyor.
// tip: "normal" = formül işler · "istisna" = kanal karari formülü ezer (cevap hep OLMAZ)
//      "td" = yabancı teknik direktör, formül işlemez (cevap hep OLUR)
window.OYUNCULAR = [
 // ——— BARAJIN ALTINDA KALANLAR (formül acımasız) ———
 {
  "ad": "Yves Bissouma",
  "takim": "Kulüpsüz (son: Tottenham)",
  "slug": "yves-bissouma",
  "tip": "normal",
  "piyasa_degeri_milyon_eur": 10,
  "instagram_takipci_milyon": 0.9,
  "durum": "2024'te kanalda 'gelirse uçak yayını olacak' denen isim — bugün serbest oyuncu ve 9 puanla artık kapsam dışı.",
  "kaynak_piyasa": "https://www.transfermarkt.us/yves-bissouma/profil/spieler/410425",
  "kaynak_instagram": "https://www.instagram.com/yves_bissouma/"
 },
 {
  "ad": "Lorenzo Pellegrini",
  "takim": "Kulüpsüz (son: Roma)",
  "slug": "lorenzo-pellegrini",
  "tip": "normal",
  "piyasa_degeri_milyon_eur": 9,
  "instagram_takipci_milyon": 0.6,
  "durum": "Beşiktaş bu yaz 10 numara için yıllık 3,5M € önerdi — gelseydi bile formüle takılırdı.",
  "kaynak_piyasa": "https://www.transfermarkt.us/lorenzo-pellegrini/profil/spieler/286297",
  "kaynak_instagram": "https://www.instagram.com/lorepelle7/"
 },
 {
  "ad": "Gustavo Hamer",
  "takim": "Sheffield United",
  "slug": "gustavo-hamer",
  "tip": "normal",
  "piyasa_degeri_milyon_eur": 14,
  "instagram_takipci_milyon": 0.05,
  "durum": "Trabzonspor'un yaz 2026 orta saha hedefi — Championship'in yıldızı ama Instagram'ı 47 bin.",
  "kaynak_piyasa": "https://www.transfermarkt.us/gustavo-hamer/profil/spieler/322985",
  "kaynak_instagram": "https://www.instagram.com/gustavohamerr/"
 },
 {
  "ad": "Jesse Lingard",
  "takim": "Corinthians",
  "slug": "jesse-lingard",
  "tip": "normal",
  "piyasa_degeri_milyon_eur": 2.2,
  "instagram_takipci_milyon": 10,
  "durum": "Eski Man United yıldızı; 10 milyon takipçiye rağmen 22 puanla baraja kıl payı takılıyor.",
  "kaynak_piyasa": "https://www.transfermarkt.us/jesse-lingard/profil/spieler/141660",
  "kaynak_instagram": "https://www.instagram.com/jesselingard/"
 },
 {
  "ad": "Adam Wharton",
  "takim": "Crystal Palace",
  "slug": "adam-wharton",
  "tip": "normal",
  "piyasa_degeri_milyon_eur": 70,
  "instagram_takipci_milyon": 0.2,
  "durum": "İngiltere millisi, 70M €'luk orta saha — ama takipçisi 200 bin. Formül şöhrete bakmıyor, çarpıma bakıyor.",
  "kaynak_piyasa": "https://www.transfermarkt.us/adam-wharton/profil/spieler/744149",
  "kaynak_instagram": "https://www.instagram.com/adamwharton10/"
 },
 {
  "ad": "Jarrad Branthwaite",
  "takim": "Everton",
  "slug": "jarrad-branthwaite",
  "tip": "normal",
  "piyasa_degeri_milyon_eur": 40,
  "instagram_takipci_milyon": 0.14,
  "durum": "40M €'luk İngiliz stoper, 138 bin takipçi — sosyal medyası ölü, uçağı yok.",
  "kaynak_piyasa": "https://www.transfermarkt.us/jarrad-branthwaite/profil/spieler/661053",
  "kaynak_instagram": "https://www.instagram.com/jarrad_b_/"
 },
 {
  "ad": "Bart Verbruggen",
  "takim": "Brighton",
  "slug": "bart-verbruggen",
  "tip": "normal",
  "piyasa_degeri_milyon_eur": 40,
  "instagram_takipci_milyon": 0.2,
  "durum": "Hollanda'nın milli kalecisi, 40M € değer — 8 puan. Kaleciye uçak yok.",
  "kaynak_piyasa": "https://www.transfermarkt.us/bart-verbruggen/profil/spieler/565093",
  "kaynak_instagram": "https://www.instagram.com/bartverbruggen1/"
 },
 {
  "ad": "Angelo Stiller",
  "takim": "VfB Stuttgart",
  "slug": "angelo-stiller",
  "tip": "normal",
  "piyasa_degeri_milyon_eur": 45,
  "instagram_takipci_milyon": 0.24,
  "durum": "Almanya'nın 6 numarası, 45M € — 11 puan. Pas yüzdesi formülde işlemiyor.",
  "kaynak_piyasa": "https://www.transfermarkt.us/angelo-stiller/profil/spieler/443710",
  "kaynak_instagram": "https://www.instagram.com/angelo.stiller/"
 },
 {
  "ad": "Maximilian Beier",
  "takim": "Borussia Dortmund",
  "slug": "maximilian-beier",
  "tip": "normal",
  "piyasa_degeri_milyon_eur": 40,
  "instagram_takipci_milyon": 0.17,
  "durum": "Dortmund'un 40M €'luk forveti, 165 bin takipçi — 7 puan.",
  "kaynak_piyasa": "https://www.transfermarkt.us/maximilian-beier/profil/spieler/578392",
  "kaynak_instagram": "https://www.instagram.com/maxbeier.14/"
 },
 {
  "ad": "Giorgi Mamardashvili",
  "takim": "Liverpool",
  "slug": "giorgi-mamardashvili",
  "tip": "normal",
  "piyasa_degeri_milyon_eur": 28,
  "instagram_takipci_milyon": 0.83,
  "durum": "Liverpool'un Gürcü kalecisi — 23,2 puan: barajın 1,8 puan altında. En acı 'olmaz'lardan.",
  "kaynak_piyasa": "https://www.transfermarkt.us/giorgi-mamardashvili/profil/spieler/502676",
  "kaynak_instagram": "https://www.instagram.com/gmamardashvili25/"
 },
 // ——— BARAJIN ÜSTÜ (yakından uzağa) ———
 {
  "ad": "Manuel Ugarte",
  "takim": "Manchester United",
  "slug": "manuel-ugarte",
  "tip": "normal",
  "piyasa_degeri_milyon_eur": 25,
  "instagram_takipci_milyon": 1,
  "durum": "Kanalda canlı hesaplanan isim; Ocak 2026'da Galatasaray kiralamak için bastırdı, United vermedi. Bugün TAM barajda: 25,0. (Şu an sakat — çapraz bağ.)",
  "kaynak_piyasa": "https://www.transfermarkt.us/manuel-ugarte/profil/spieler/476701",
  "kaynak_instagram": "https://www.instagram.com/ugartemanu/"
 },
 {
  "ad": "Sergio Ramos",
  "takim": "Kulüpsüz (son: Monterrey)",
  "slug": "sergio-ramos",
  "tip": "normal",
  "piyasa_degeri_milyon_eur": 0.8,
  "instagram_takipci_milyon": 67.5,
  "durum": "Piyasa değeri 1M €'nun bile altında — ama 67M takipçi çarpımı 54'e taşıyor. Formülün ters köşesi.",
  "kaynak_piyasa": "https://www.transfermarkt.us/sergio-ramos/profil/spieler/25557",
  "kaynak_instagram": "https://hypeauditor.com/instagram/sergioramos/"
 },
 {
  "ad": "Malcom",
  "takim": "Al-Hilal",
  "slug": "malcom",
  "tip": "normal",
  "piyasa_degeri_milyon_eur": 18,
  "instagram_takipci_milyon": 3,
  "durum": "Kanal arşivinin gerçek örneği: 2024'te 54 puanla 'açıldı' denmişti — bugün de tam 54.",
  "kaynak_piyasa": "https://www.transfermarkt.us/malcom/profil/spieler/323704",
  "kaynak_instagram": "https://www.instagram.com/malcomoliveira_97/"
 },
 {
  "ad": "Luis Suárez",
  "takim": "Inter Miami",
  "slug": "luis-suarez",
  "tip": "normal",
  "piyasa_degeri_milyon_eur": 1.5,
  "instagram_takipci_milyon": 46,
  "durum": "39 yaşında, değeri 1,5M € — ama 46M takipçiyle hâlâ açılıyor.",
  "kaynak_piyasa": "https://www.transfermarkt.us/luis-suarez/profil/spieler/44352",
  "kaynak_instagram": "https://www.instagram.com/luissuarez9/"
 },
 {
  "ad": "Dušan Vlahović",
  "takim": "Kulüpsüz (Juventus'tan serbest)",
  "slug": "dusan-vlahovic",
  "tip": "normal",
  "piyasa_degeri_milyon_eur": 35,
  "instagram_takipci_milyon": 2,
  "durum": "1 Temmuz'da bonservissiz kaldı; Milliyet'e göre Beşiktaş başkanı transfer için bizzat devrede.",
  "kaynak_piyasa": "https://www.transfermarkt.us/dusan-vlahovic/profil/spieler/357498",
  "kaynak_instagram": "https://www.instagram.com/vlahovicdusan/"
 },
 {
  "ad": "James Rodríguez",
  "takim": "Kulüpsüz (son: Minnesota United)",
  "slug": "james-rodriguez",
  "tip": "normal",
  "piyasa_degeri_milyon_eur": 1.5,
  "instagram_takipci_milyon": 50.1,
  "durum": "1 Temmuz'dan beri serbest; değeri 1,5M € ama 50M takipçi — 75 puanla rahat açılır.",
  "kaynak_piyasa": "https://www.transfermarkt.us/james-rodriguez/profil/spieler/88103",
  "kaynak_instagram": "https://hypeauditor.com/instagram/jamesrodriguez10/"
 },
 {
  "ad": "Christopher Nkunku",
  "takim": "AC Milan",
  "slug": "christopher-nkunku",
  "tip": "normal",
  "piyasa_degeri_milyon_eur": 25,
  "instagram_takipci_milyon": 3,
  "durum": "Fenerbahçe'nin bu yazki somut hedefi: 25M'lik teklif reddedildi, 30M'ye çıkılıyor (Temmuz 2026).",
  "kaynak_piyasa": "https://www.transfermarkt.us/christopher-nkunku/profil/spieler/344381",
  "kaynak_instagram": "https://www.instagram.com/c_nkunku/"
 },
 {
  "ad": "Ademola Lookman",
  "takim": "Atlético Madrid",
  "slug": "ademola-lookman",
  "tip": "normal",
  "piyasa_degeri_milyon_eur": 40,
  "instagram_takipci_milyon": 2,
  "durum": "Kanal arşivinde 2024'te 49 puanla açılan isim — şimdi Atlético'da, 80 puan.",
  "kaynak_piyasa": "https://www.transfermarkt.us/ademola-lookman/profil/spieler/406040",
  "kaynak_instagram": "https://www.instagram.com/molalookman/"
 },
 {
  "ad": "Isco",
  "takim": "Real Betis",
  "slug": "isco",
  "tip": "normal",
  "piyasa_degeri_milyon_eur": 3.5,
  "instagram_takipci_milyon": 29,
  "durum": "Değeri 3,5M €'ya indi ama Real Madrid yıllarından kalan 29M takipçi işini görüyor: 101,5.",
  "kaynak_piyasa": "https://www.transfermarkt.us/isco/profil/spieler/85288",
  "kaynak_instagram": "https://www.instagram.com/iscoalarcon/"
 },
 {
  "ad": "Hakan Çalhanoğlu",
  "takim": "Inter Milan",
  "slug": "hakan-calhanoglu-oyun",
  "tip": "normal",
  "piyasa_degeri_milyon_eur": 16,
  "instagram_takipci_milyon": 7,
  "durum": "Süper Lig'de hiç oynamadı (Almanya doğumlu) — 'Inter'den dönerse' senaryosu yıllardır transfer gündeminde.",
  "kaynak_piyasa": "https://www.transfermarkt.us/hakan-calhanoglu/profil/spieler/126414",
  "kaynak_instagram": "https://www.instagram.com/hakancalhanoglu/"
 },
 {
  "ad": "Memphis Depay",
  "takim": "Corinthians",
  "slug": "memphis-depay",
  "tip": "normal",
  "piyasa_degeri_milyon_eur": 7,
  "instagram_takipci_milyon": 20,
  "durum": "Beşiktaş/Fenerbahçe söylentileri yıllardır var, hiç gelmedi — gelse 140 puanla açılırdı.",
  "kaynak_piyasa": "https://www.transfermarkt.us/memphis-depay/profil/spieler/167850",
  "kaynak_instagram": "https://hypeauditor.com/instagram/memphisdepay/"
 },
 {
  "ad": "Paul Pogba",
  "takim": "AS Monaco",
  "slug": "paul-pogba",
  "tip": "normal",
  "piyasa_degeri_milyon_eur": 2.5,
  "instagram_takipci_milyon": 63.6,
  "durum": "Doping cezası sonrası değeri 2,5M €'ya çöktü — ama 63M takipçiyle hâlâ 159 puan.",
  "kaynak_piyasa": "https://www.transfermarkt.us/paul-pogba/marktwertverlauf/spieler/122153",
  "kaynak_instagram": "https://hypeauditor.com/instagram/paulpogba/"
 },
 {
  "ad": "Jadon Sancho",
  "takim": "Kulüpsüz (son: Man United)",
  "slug": "jadon-sancho",
  "tip": "normal",
  "piyasa_degeri_milyon_eur": 18,
  "instagram_takipci_milyon": 10,
  "durum": "Kanalda 2024'te 'Sancho gelirse uçak yayını olacak' denmişti. Bugün kulüpsüz — ve hâlâ 180 puanla açılır.",
  "kaynak_piyasa": "https://www.transfermarkt.us/jadon-sancho/profil/spieler/401173",
  "kaynak_instagram": "https://www.instagram.com/sancho/"
 },
 {
  "ad": "Alejandro Garnacho",
  "takim": "Chelsea",
  "slug": "alejandro-garnacho",
  "tip": "normal",
  "piyasa_degeri_milyon_eur": 28,
  "instagram_takipci_milyon": 11,
  "durum": "Chelsea'de zor bir sezon geçirdi, değeri 28M'e indi — ama 11M takipçi çarpımı 308'e taşıyor.",
  "kaynak_piyasa": "https://www.transfermarkt.us/alejandro-garnacho/profil/spieler/811779",
  "kaynak_instagram": "https://www.instagram.com/garnacho7/"
 },
 {
  "ad": "Antoine Griezmann",
  "takim": "Orlando City",
  "slug": "antoine-griezmann",
  "tip": "normal",
  "piyasa_degeri_milyon_eur": 8,
  "instagram_takipci_milyon": 39,
  "durum": "Dün (13 Temmuz 2026) Atlético'dan MLS'e imzaladı — değeri 8M ama 39M takipçiyle 312 puan.",
  "kaynak_piyasa": "https://www.transfermarkt.us/antoine-griezmann/profil/spieler/125781",
  "kaynak_instagram": "https://www.instagram.com/antogriezmann/"
 },
 {
  "ad": "João Félix",
  "takim": "Al-Nassr",
  "slug": "joao-felix",
  "tip": "normal",
  "piyasa_degeri_milyon_eur": 28,
  "instagram_takipci_milyon": 13,
  "durum": "2025'te Suudi Arabistan'a gitti — Avrupa'ya (ya da başka yere) dönüş her pencerede konuşuluyor.",
  "kaynak_piyasa": "https://www.transfermarkt.us/joao-felix/profil/spieler/462250",
  "kaynak_instagram": "https://www.instagram.com/joaofelix79/"
 },
 {
  "ad": "Karim Benzema",
  "takim": "Al-Hilal",
  "slug": "karim-benzema",
  "tip": "normal",
  "piyasa_degeri_milyon_eur": 5,
  "instagram_takipci_milyon": 75.2,
  "durum": "38 yaşında, değeri 5M € — ama Ballon d'Or arşivinden kalan 75M takipçiyle ezici şekilde açılır.",
  "kaynak_piyasa": "https://www.transfermarkt.us/karim-benzema/profil/spieler/18922",
  "kaynak_instagram": "https://www.edigitalagency.com.au/instagram/most-followed-footballers-instagram/"
 },
 {
  "ad": "Rafael Leão",
  "takim": "AC Milan",
  "slug": "rafael-leao-oyun",
  "tip": "normal",
  "piyasa_degeri_milyon_eur": 50,
  "instagram_takipci_milyon": 8,
  "durum": "Romano'ya göre Galatasaray bu yaz Leão için girişim başlattı; Milan 60M € istiyor (Haziran 2026).",
  "kaynak_piyasa": "https://www.transfermarkt.us/rafael-leao/profil/spieler/357164",
  "kaynak_instagram": "https://www.instagram.com/iamrafaeleao93/"
 },
 {
  "ad": "Florian Wirtz",
  "takim": "Liverpool",
  "slug": "florian-wirtz",
  "tip": "normal",
  "piyasa_degeri_milyon_eur": 100,
  "instagram_takipci_milyon": 5,
  "durum": "2025'te Leverkusen'den Liverpool'a gitti. 100M € değer, 'sadece' 5M takipçi — yine de 500 puan.",
  "kaynak_piyasa": "https://www.transfermarkt.us/florian-wirtz/profil/spieler/598577",
  "kaynak_instagram": "https://likeometer.co/@flowirtz?lang=en"
 },
 {
  "ad": "Neymar",
  "takim": "Santos",
  "slug": "neymar",
  "tip": "normal",
  "piyasa_degeri_milyon_eur": 8,
  "instagram_takipci_milyon": 240.4,
  "durum": "Piyasa değeri 8M €'ya düştü — ama 240M takipçi formülü 1.923'e uçuruyor. Formülün en absürt kartı.",
  "kaynak_piyasa": "https://www.transfermarkt.us/neymar/profil/spieler/68290",
  "kaynak_instagram": "https://hypeauditor.com/instagram/neymarjr/"
 },
 {
  "ad": "Vinícius Júnior",
  "takim": "Real Madrid",
  "slug": "vinicius-junior",
  "tip": "normal",
  "piyasa_degeri_milyon_eur": 140,
  "instagram_takipci_milyon": 62,
  "durum": "Rüya kartı: 8.680 puan — kanal tarihinin en uzun uçak yayınını gerektirirdi.",
  "kaynak_piyasa": "https://www.transfermarkt.us/vinicius-junior/profil/spieler/371998",
  "kaynak_instagram": "https://www.instagram.com/vinijr/"
 },
 // ——— ÖZEL KARTLAR ———
 {
  "ad": "Mason Greenwood",
  "takim": "Olympique Marseille",
  "slug": "mason-greenwood",
  "tip": "istisna",
  "piyasa_degeri_milyon_eur": 55,
  "instagram_takipci_milyon": 3,
  "durum": "Kanalın sabit kararı: hassasiyet gerekçesiyle hangi takıma gelirse gelsin uçak yayını YOK. Formül 165 dese de cevap değişmez.",
  "kaynak_piyasa": "https://www.transfermarkt.us/mason-greenwood/profil/spieler/532826",
  "kaynak_instagram": "https://www.instagram.com/masongreenwood/"
 },
 {
  "ad": "Jürgen Klopp",
  "takim": "Teknik Direktör",
  "slug": "jurgen-klopp-td",
  "tip": "td",
  "piyasa_degeri_milyon_eur": null,
  "instagram_takipci_milyon": null,
  "durum": "Kanal kuralı: yabancı teknik direktörlere formül işlemez — 'yabancı hocaların tamamına açıyoruz.' Solskjaer'den Tedesco'ya hepsine açıldı.",
  "kaynak_piyasa": null,
  "kaynak_instagram": null
 },
 {
  "ad": "Zinédine Zidane",
  "takim": "Teknik Direktör",
  "slug": "zinedine-zidane-td",
  "tip": "td",
  "piyasa_degeri_milyon_eur": null,
  "instagram_takipci_milyon": null,
  "durum": "Yabancı hoca istisnası: formül hesaplanmaz, uçak yayını her koşulda açılır. Kural kartıydı — tebrikler (ya da başın sağ olsun).",
  "kaynak_piyasa": null,
  "kaynak_instagram": null
 }
];

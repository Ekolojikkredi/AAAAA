// Öğrenci Kayıt Fonksiyonu
document.getElementById("ogrenciKayitForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const isim = document.getElementById("ogrenciIsim").value;
    const soyisim = document.getElementById("ogrenciSoyisim").value;
    const okul = document.getElementById("ogrenciOkul").value;
    const okulNo = document.getElementById("ogrenciOkulNo").value;
    const email = document.getElementById("ogrenciEmail").value;

    localStorage.setItem("ogrenci", JSON.stringify({isim, soyisim, okul, okulNo, email}));

    alert("Kayıt başarılı! E-posta doğrulaması gönderilecektir.");
});

// Veri Girişi Fonksiyonu
document.getElementById("veriGirisForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const atikTuru = document.getElementById("atikk").value;
    const atikMiktar = document.getElementById("atikkMiktar").value;
    const dogruAyiklama = document.getElementById("dogruAyiklama").checked;

    // Burada veriyi yerel depolamaya kaydedebiliriz.
    let veriler = JSON.parse(localStorage.getItem("veriler")) || [];
    veriler.push({ atikTuru, atikMiktar, dogruAyiklama });

    localStorage.setItem("veriler", JSON.stringify(veriler));

    alert("Veri başarıyla kaydedildi.");
});

// Veri Görüntüleme Fonksiyonu
document.getElementById("veriGoruntulemeForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const emailLogin = document.getElementById("emailLogin").value;
    const passwordLogin = document.getElementById("passwordLogin").value;

    // Kaydedilmiş öğrenci verisini kontrol et
    const ogrenci = JSON.parse(localStorage.getItem("ogrenci"));

    if (ogrenci && ogrenci.email === emailLogin) {
        // Öğrenci bilgilerini ve verilerini görüntüle
        const veriler = JSON.parse(localStorage.getItem("veriler")) || [];
        let totalPoints = 0;

        // Atık türüne göre puan hesaplama
        veriler.forEach(veri => {
            let points = 0;
            switch (veri.atikTuru) {
                case "kağıt":
                    points = veri.atikMiktar * 5;
                    break;
                case "plastik":
                    points = veri.atikMiktar * 3;
                    break;
                case "metal":
                    points = veri.atikMiktar * 4;
                    break;
                case "cam":
                    points = veri.atikMiktar * 6;
                    break;
                case "elektronik":
                    points = veri.atikMiktar * 10;
                    break;
                case "yağ":
                    points = veri.atikMiktar * 7;
                    break;
                case "tekstil":
                    points = veri.atikMiktar * 2;
                    break;
                default:
                    points = 0;
            }

            totalPoints += points;
        });

        // Unvanlar
        let unvan = "";
        if (totalPoints >= 50) {
            unvan = "Yeşil Kahraman";
        } else if (totalPoints >= 30) {
            unvan = "Doğa Savaşçısı";
        } else if (totalPoints >= 10) {
            unvan = "Çevre Dostu";
        } else {
            unvan = "Yeni Başlayan";
        }

        // Öğrencinin bilgilerini ve puanlarını göster
        document.getElementById("ogrenciBilgileri").style.display = "block";
        document.getElementById("puanlar").innerHTML = `
            <p>Öğrenci: ${ogrenci.isim} ${ogrenci.soyisim}</p>
            <p>Okul: ${ogrenci.okul}</p>
            <p>Email: ${ogrenci.email}</p>
            <p>Toplam Puan: ${totalPoints}</p>
            <p>Unvan: ${unvan}</p>
        `;
    } else {
        alert("E-posta veya şifre hatalı.");
    }
});

const socket = io.connect();
const mesaj = document.getElementById('mesaj');
const gonderbtn = document.getElementById('gonderbtn');
const cikti = document.getElementById('cikti');
const feedback = document.getElementById('feedback');
const gonderen = document.getElementById('gonderen');
const sohbet_ekrani = document.getElementById('sohbet-ekrani');

// Gönder Butonuna Basıldıysa Gerekli Kontrolleri Yapıyoruz ve Şartlar Uygunsa Yazı Değerlerini Emitliyoruz.

gonderbtn.addEventListener('click', () => {
    if(mesaj.value == ""){
        mesaj.placeholder="Lütfen Boş Alan Bırakmayınız!";
    }else{
        socket.emit('sohbet', {
            mesaj: mesaj.value,
            gonderen: gonderen.innerHTML
        });
        mesaj.placeholder="Mesajınızı Giriniz...";
        mesaj.value = ""
    }

});

// Mesajı Ekrana yazdırıyoruz ve Scroll Ayarını Yapıyoruz

socket.on('sohbet', data => {
    // Sohbette Kullanılan html Kodlarını Devre Dışı Bırakıyoruz ve Mesajımızı Yazıdırıyoruz.
    cikti.innerHTML += "<h4><strong>" + data.gonderen + ": </strong>" + data.mesaj.replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); + "</h4>";
    feedback.innerHTML = ""
    sohbet_ekrani.scrollTop = sohbet_ekrani.scrollHeight;
});

// Herhangi Bir Tuşa Basıldıysa veya Silme Tuşuna Basıldıysa 'yaziyor' veya 'silme' Komutlarını Emitlioruz

mesaj.addEventListener('keydown', () => {
    //Mesaj Kısmı Boş ise feedback Kısmını data Olarak Gönderiyoruz.
    if(event.keyCode == 8 || mesaj.value == ""){
        let tus = feedback.innerHTML = "";
        socket.emit('siliyor1',tus);
    }else{
        socket.emit('yaziyor1',gonderen.innerHTML);
    }
});

// Mesaj Kutucuğunun İçi Boş ise Siliyor Emitini Yakalıyoruz ve feedback Kısmını Temizliyoruz

socket.on('siliyor1', data => {
    feedback.innerHTML = "";
})

// yaziyor emitini Yakalayıp feedback Kısmına Değerimizi Yazdırıyoruz

socket.on('yaziyor1', data => {
    feedback.innerHTML = '<h5>' + data + " Yazıyor..." + "</h5>"
});

// Enter Tuşuna Basıldıysa Eğer Gönder Butonuna click Ettiriyoruz

mesaj.addEventListener('keyup', () => {
    if (event.keyCode == 13){
        event.preventDefault();
        gonderbtn.click();
    }
});
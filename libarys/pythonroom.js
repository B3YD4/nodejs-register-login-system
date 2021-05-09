const socket = io.connect();
const mesaj = document.getElementById('mesaj');
const gonderbtn = document.getElementById('gonderbtn');
const cikti = document.getElementById('cikti');
const feedback = document.getElementById('feedback');
const gonderen = document.getElementById('gonderen');
const sohbet_ekrani = document.getElementById('sohbet-ekrani');

// İmleci Direkt Mesaj Yazma Kısmına Tıklatıyoruz

if(mesaj.value == ""){
    mesaj.focus();
}

// Gönder Butonuna Basıldıysa Gerekli Kontrolleri Yapıyoruz ve Şartlar Uygunsa Yazı Değerlerini Emitliyoruz.

gonderbtn.addEventListener('click', () => {
    if(mesaj.value == ""){
        
        mesaj.placeholder="Lütfen Boş Alan Bırakmayınız!";
        mesaj.focus();

    }else if(mesaj.value == "sa" || mesaj.value == "Sa" || mesaj.value == "sA" || mesaj.value == "SA"){

        const text = "Selâmün Aleyküm"
        socket.emit('sohbet3', {
            mesaj: text,
            gonderen: gonderen.innerHTML
        });
        mesaj.placeholder="Mesajınızı Giriniz...";
        mesaj.value = ""
        mesaj.focus();

    }else if(mesaj.value == "as" || mesaj.value == "AS" || mesaj.value == "As" || mesaj.value == "aS"){

        const text = "Aleyküm Selâm"
        socket.emit('sohbet3', {
            mesaj: text,
            gonderen: gonderen.innerHTML
        });
        mesaj.placeholder="Mesajınızı Giriniz...";
        mesaj.value = ""
        mesaj.focus();

    }else{
        socket.emit('sohbet3', {
            mesaj: mesaj.value,
            gonderen: gonderen.innerHTML
        });
        mesaj.placeholder="Mesajınızı Giriniz...";
        mesaj.value = ""
        mesaj.focus();
    }

});

// Mesajı Ekrana yazdırıyoruz ve Scroll Ayarını Yapıyoruz

socket.on('sohbet3', data => {
    // Sohbette Kullanılan html Kodlarını Devre Dışı Bırakıyoruz ve Mesajımızı Yazıdırıyoruz.
    if(data.gonderen == "B3YD4" || data.gonderen == "b3yd4"){
        cikti.innerHTML += "<h4><strong style='color:#eb3b5a;text-shadow: 3px 3px 15px #eb3b5a;'>" + data.gonderen + ": </strong>" + data.mesaj.replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); + "</h4>";
        feedback.innerHTML = ""
        sohbet_ekrani.scrollTop = sohbet_ekrani.scrollHeight;
    }else{
        cikti.innerHTML += "<h4><strong>" + data.gonderen + ": </strong>" + data.mesaj.replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); + "</h4>";
        feedback.innerHTML = ""
        sohbet_ekrani.scrollTop = sohbet_ekrani.scrollHeight;
    }

});

// Herhangi Bir Tuşa Basıldıysa veya Silme Tuşuna Basıldıysa 'yaziyor' veya 'silme' Komutlarını Emitlioruz

mesaj.addEventListener('keydown', () => {
    //Mesaj Kısmı Boş ise feedback Kısmını data Olarak Gönderiyoruz.
    if(event.keyCode == 8 || mesaj.value == ""){
        let tus = feedback.innerHTML = "";
        socket.emit('siliyor3',tus);
    }else{
        socket.emit('yaziyor3',gonderen.innerHTML);
    }
});

// Mesaj Kutucuğunun İçi Boş ise Siliyor Emitini Yakalıyoruz ve feedback Kısmını Temizliyoruz

socket.on('siliyor3', data => {
    feedback.innerHTML = "";
})

// yaziyor emitini Yakalayıp feedback Kısmına Değerimizi Yazdırıyoruz

socket.on('yaziyor3', data => {
    feedback.innerHTML = '<h5>' + data + " Yazıyor..." + "</h5>"
});

// Enter Tuşuna Basıldıysa Eğer Gönder Butonuna click Ettiriyoruz

mesaj.addEventListener('keyup', () => {
    if (event.keyCode == 13){
        event.preventDefault();
        gonderbtn.click();
    }
});

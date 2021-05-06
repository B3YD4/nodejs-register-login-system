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
    
    }else if(mesaj.value == "sa" || mesaj.value == "Sa" || mesaj.value == "sA" || mesaj.value == "SA"){

        const text = "Selâmün Aleyküm"
        socket.emit('chat', {
            mesaj: text,
            gonderen: gonderen.innerHTML
        });
        mesaj.placeholder="Mesajınızı Giriniz...";
        mesaj.value = ""

    }else if(mesaj.value == "as" || mesaj.value == "AS" || mesaj.value == "As" || mesaj.value == "aS"){

        const text = "Aleyküm Selâm"
        socket.emit('chat', {
            mesaj: text,
            gonderen: gonderen.innerHTML
        });
        mesaj.placeholder="Mesajınızı Giriniz...";
        mesaj.value = ""

    }else{
        socket.emit('chat', {
            mesaj: mesaj.value,
            gonderen: gonderen.innerHTML
        });
        mesaj.placeholder="Mesajınızı Giriniz...";
        mesaj.value = ""
    }

});

// Mesajı Ekrana yazdırıyoruz ve Scroll Ayarını Yapıyoruz

socket.on('chat', data => {
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
        socket.emit('siliyor',tus);
    }else{
        socket.emit('yaziyor',gonderen.innerHTML);
    }
});

// Mesaj Kutucuğunun İçi Boş ise Siliyor Emitini Yakalıyoruz ve feedback Kısmını Temizliyoruz

socket.on('siliyor', data => {
    feedback.innerHTML = "";
})

// yaziyor emitini Yakalayıp feedback Kısmına Değerimizi Yazdırıyoruz

socket.on('yaziyor', data => {
    feedback.innerHTML = '<h5>' + data + " Yazıyor..." + "</h5>"
});

// Enter Tuşuna Basıldıysa Eğer Gönder Butonuna click Ettiriyoruz

mesaj.addEventListener('keyup', () => {
    if (event.keyCode == 13){
        event.preventDefault();
        gonderbtn.click();
    }
});

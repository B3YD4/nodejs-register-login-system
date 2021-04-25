const socket = io.connect();

const mesaj = document.getElementById('mesaj');
const gonderbtn = document.getElementById('gonderbtn');
const cikti = document.getElementById('cikti');
const feedback = document.getElementById('feedback');
const gonderen = document.getElementById('gonderen');
const sohbet_ekrani = document.getElementById('sohbet-ekrani');

// Mesaj Değerlerini Gönderiyoruz

gonderbtn.addEventListener('click', () => {

    socket.emit('chat', {
        mesaj: mesaj.value,
        gonderen: gonderen.innerHTML
    });

    mesaj.value = ""

});

// Mesajı Ekrana yazdırıyoruz ve Scroll Ayarını Yapıyoruz

socket.on('chat', data => {
    cikti.innerHTML += "<h4><strong>" + data.gonderen + ": </strong>" + data.mesaj + "</h4>"
    feedback.innerHTML = ""
    sohbet_ekrani.scrollTop = sohbet_ekrani.scrollHeight;
});

// Herhangi Bir Tuşa Basıldıysa yaziyor komutunu emitliyoruz

mesaj.addEventListener('keypress', () => {
    socket.emit('yaziyor',gonderen.innerHTML);
});

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

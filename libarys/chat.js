const socket = io.connect('https://yazilimblog.ga');

const mesaj = document.getElementById('mesaj');
const gonderbtn = document.getElementById('gonderbtn');
const cikti = document.getElementById('cikti');
const feedback = document.getElementById('feedback');
const gonderen = document.getElementById('gonderen');

gonderbtn.addEventListener('click', () => {

    socket.emit('chat', {
        mesaj: mesaj.value,
        gonderen: gonderen.innerHTML
    });

});

socket.on('chat', data => {
    cikti.innerHTML += "<h4><strong>" + data.gonderen + ": </strong>" + data.mesaj + "</h4>"
    mesaj.value = ""
    feedback.innerHTML = ""
});

mesaj.addEventListener('keypress', () => {
    socket.emit('yaziyor',gonderen.innerHTML);
});

mesaj.addEventListener('keyup', () => {
    if (event.keyCode == 13){
        event.preventDefault();
        gonderbtn.click();
    }
});

socket.on('yaziyor', data => {
    feedback.innerHTML = '<h5>' + data + " Yazıyor..." + "</h5>"
});

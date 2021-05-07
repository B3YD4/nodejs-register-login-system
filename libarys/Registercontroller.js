function verify(){
    
    var pass1 = document.getElementById('pass1').value;
    var pass2 = document.getElementById('pass2').value;
    var kadi = document.getElementById('kadi').value;
    var mail = document.getElementById('mail').value;

    if(pass1 != pass2 || pass2 != pass1){
        
        Swal.fire({
            icon: 'error',
            title: 'Belirttiğiniz Şifreler Uyuşmuyor!',
            showConfirmButton: false,
            timer: 1500
          });

    }else{
        Swal.fire({
            icon: 'success',
            title: 'Kaydınız Başarı ile Tamamlandı!',
            showConfirmButton: false,
            timer: 1500
          });
          
    }

}

function valid(){

    var form = document.getElementById('kayit');
    var mail = document.getElementById('mail').value;
    var btn = document.getElementById('buton');
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    var invalid = document.getElementById('yazi');
    var valid = document.getElementById('yazi2');


    if (mail.match(pattern)){

        valid.style.display = "block"
        invalid.style.display = "none"
        btn.style.display = "block"

    }else{

        valid.style.display = "none"
        invalid.style.display = "block"
        btn.style.display = "none"

    }
}

function passvalid(){

    var pass1 = document.getElementById('pass1').value;
    var pass2 = document.getElementById('pass2').value;
    var btn = document.getElementById('buton');
    var esle = document.getElementById('esle');
    var invalidpass = document.getElementById('sifreyazi');
    var invalidpass2 = document.getElementById('sifreyazi2');
    var invalidpattern = /[+,!,?,*,_,%]/i;

    // Şifre de Özel Karakter Kontrolü

    if(pass1.match(invalidpattern)){

        invalidpass.style.display = "none"

    }else{

        invalidpass.style.display = "block"
        btn.style.display = "none"
    }

    if(pass2.match(invalidpattern)){

        invalidpass2.style.display = "none"

    }else{

        invalidpass2.style.display = "block"
        btn.style.display = "none"

    }

    // Şifreler Aynı Değil Kontrolü

    if(pass1 != pass2){

        esle.style.display = "block"

    }else if(pass2 != pass1){
        
        esle.style.display = "block"

    }else{

        esle.style.display = "none"
        btn.style.display = "block"

    }

}
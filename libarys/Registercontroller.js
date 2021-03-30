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
            background: #151515,
            timer: 1500
          });

    }else{
        Swal.fire({
            icon: 'success',
            title: 'Kaydınız Başarı ile Tamamlandı!',
            showConfirmButton: false,
            background: #151515,
            timer: 1500
          });
          
    }

}

const express = require('express');
const router = express.Router();
const User = require('../models/user');

// anasayfa get-post

router.get('/', (req, res) => {
    res.render('index', {title: 'Giriş Yap'});
});


router.post('/', (req, res)  => {

    const pass = req.body.pass;
    const name = req.body.kadi;

    const bul = User.findOne({$and:[{kullaniciadi: name},{sifre: pass}]},(err,data) =>{
        
        try{

            if(bul){
                //res.send("<h1><center>Hoşgeldin " + data.kullaniciadi + " Seni Aramız'da Görmekten Mutluluk Duyduk...")
                res.render('userpage',{title:data.kullaniciadi});
            }

        }catch{
            res.send("<h1><center>Kullanıcı Adı veya Şifre Yanlış...")
        }

    });

});

// kayıt olma get-post

router.get('/kayitol', (req, res) => {
    res.render('kayit', {title: 'Kayıt Ol'});
});

router.post('/kayitol', (req, res) => {

    const name = req.body.kullaniciadi;
    const mail = req.body.eposta;
    const pass = req.body.sifre;
    const passtry = req.body.sifre_tekrar;

    
    const validate = User.findOne({eposta: mail},(err,data) =>{
        
        try{

            if(validate){
                if(data.eposta == mail){
                    res.send("Bu Mail Müsait Değil!");
                }
            }

        }catch{
            res.redirect("/");
        }
        
    });
    

    const user = new User({
        kullaniciadi: name,
        eposta: mail,
        sifre: pass,
        sifre_tekrar: passtry
    });



    

    if(pass != passtry || passtry != pass){

        setTimeout(()=>{
            res.redirect('/kayitol');
        }, 1600);

    }else{
        setTimeout(()=>{

            user.save((err,data) => {
                if(err){
                    console.log(err);
                }else{
                    res.redirect('/')
                }
                
            });

        },1800);

    }

});


// Yönlendirmeler

router.get('/girisyap', (req, res) => {
    res.redirect('/')
});

router.get('/login',(req, res) => {
    res.redirect('/')
});

// Eğer Sayfa Bulunamadıysa

router.use((req, res) => {
    res.send("<h1><center>Açık mı Arıyosun Cnm :D");
})

module.exports = router;

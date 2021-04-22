const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Anasayfa GET-POST

router.get('/', (req, res) => {

    if(req.session.userId){
        res.render('userpage',{title:req.session.userName});
    }else{
        res.render('index', {title: 'Giriş Yap'});
    }

});

router.post('/', (req, res)  => {

    const pass = req.body.pass;
    const mail = req.body.email;

    const bul = User.findOne({eposta: mail},(err,data) =>{
        
        try{

            if(bul){

                req.session.userId = data._id
                req.session.userName = data.kullaniciadi

                bcrypt.compare(data.sifre, pass, (err, result) => {
                    res.render('userpage',{title:data.kullaniciadi});
                });
                
            }

        }catch{
            res.send("<h1><center>Mail Adresi veya Şifre Yanlış...")
        }

    });

});


// ===== Kayıt Olma GET-POST =====

router.get('/kayitol', (req, res) => {

    if(req.session.userId){
        res.redirect('/');
    }else{
        res.render('kayit', {title: 'Kayıt Ol'});
    }
    
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

    bcrypt.hash(pass, 10, (err, hash) => {
        
        const user = new User({
            kullaniciadi: name,
            eposta: mail,
            sifre: hash,
            sifre_tekrar: hash
        });
    
    
    
        user.save((err,data) => {
            if(err){
                console.log(err);
            }else{
                console.log('Başarılı!');
            }
                    
        });

    });

});


// ===== Çıkış Yapma =====
router.get('/cikisyap', (req, res) => {
    req.session.destroy((err) => {
        if(err){
            console.log(err);
        }else{
            res.redirect('/');
        }
    });
});

// ===== JavaScript Odası =====
router.get('/javascriptodasi', (req, res) => {

    if(req.session.userId){
        res.render('rooms/jsroom.ejs', {title:req.session.userName});
    }else{
        res.redirect('/');
    }

});

// ===== Yönlendirmeler =====

router.get('/girisyap', (req, res) => {
    res.redirect('/')
});

router.get('/login',(req, res) => {
    res.redirect('/')
});


// Eğer Sayfa Bulunamadıysa

router.use((req, res) => {

    if(req.session.userId){
        res.redirect('/');
    }else{
        res.send("<h1><center>Açık mı Arıyosun Cnm :D");
    }

});

module.exports = router

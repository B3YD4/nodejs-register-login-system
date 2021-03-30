const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET İstekleri

router.get('/', (req, res) => {
    res.render('index', {title: 'Giriş Yap'});
});

router.get('/kayitol', (req, res) => {
    res.render('kayit', {title: 'Kayıt Ol'});
});

// POST İstekleri

router.post('/', (req, res)  => {
    res.send('Kayıtlar Devam Ediyor Dostum Giriş Yapamazsın...');
});
router.post('/kayitol', (req, res) => {

    const name = req.body.kullaniciadi;
    const mail = req.body.eposta;
    const pass = req.body.sifre;
    const passtry = req.body.sifre_tekrar;

    const user = new User({
        kullaniciadi: name,
        eposta: mail,
        sifre: pass,
        sifre_tekrar: passtry

    });

    if(pass != passtry || passtry != pass){

        setTimeout(()=>{
            res.redirect('/kayitol')
        }, 1600);

    }else{
        setTimeout(()=>{

            user.save((err,data) => {
                if(err)
                    console.log(err);
                res.redirect('/')
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

module.exports = router;

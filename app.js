const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/user')
const port = process.env.PORT || 3000;

// Veri Tabanı Bağlantısı...
mongoose.connect('mongodb://localhost/users', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('open', () => {
    console.log('Veri Tabanı Bağlantısı Sağlandı...')
});
mongoose.connection.on('error', (err) => {
    console.log('Veritabanı Bağlantı Hatası: ', err);
});

// Görüntü Motoru Yüklüyoruz
app.set('view engine', 'ejs');

// Server'ı Dinlemeye Aldık
app.listen(port, (req, res) => {
    console.log("Server Ayağa Kaldırıldı...");
});

// Css dosyaları ve Terminal İçin Gerekli İşlemleri Yaptık
app.use(express.static('css'));
app.use(express.static('img'));
app.use(express.static('libarys'));
app.use(morgan('dev'));

// Yönlendirmeler - Şema

app.get('/add', (req, res) => {
    const user = new User({
        kullaniciadi: 'BayDS',
        eposta: 'hilecehennemi6@gmail.com',
        sifre: '123456789',
        sifre_tekrar: '123456789'
    });
    user.save((err, data) => {
        if(err)
            console.log(err);
        res.json(data);
    });
});

app.get('/',  (req, res) => {
    res.render('index', {title: 'Giriş Yap'});
});

app.get('/girisyap', (req, res) => {
    res.redirect('/')
});

app.get('/kayitol',  (req, res) => {
    res.render('kayit', {title: 'Kayıt Ol'});
});

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/user')
const port = process.env.port || 3000;
const uri = process.env.MONGO;
//const dbURL = "mongodb+srv://b3yd4:b3yd42003@yazilimblog.fk8py.mongodb.net/users?retryWrites=true&w=majority";
const usercli = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const Swal = require('sweetalert2');

// Veri Tabanı Bağlantısı...
mongoose.connect(uri , {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('open', () => {
    console.log('Veri Tabanı Bağlantısı Sağlandı...')
});
mongoose.connection.on('error', (err) => {
    console.log('Veritabanı Bağlantı Hatası: ', err);
});

// Görüntü Motoru Yüklüyoruz
app.set('view engine', 'ejs');

// Server'ı Dinlemeye Aldık
app.listen(3000, (req, res) => {
    console.log("Server Ayağa Kaldırıldı...");
});

// body-parser dahil ettik
app.use(bodyParser.urlencoded({ extended: true }));

// Css dosyaları ve Terminal İçin Gerekli İşlemleri Yaptık
app.use(express.static('css'));
app.use(express.static('img'));
app.use(express.static('libarys'));
app.use(morgan('dev'));

// Yönlendirmeler - Şema
app.use('/',usercli);

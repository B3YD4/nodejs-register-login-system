const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const http = require('http').createServer(app);
const User = require('./models/user')
const uri = process.env.MONGO;
const dbURL = "mongodb+srv://b3yd4:b3yd42003@yazilimblog.fk8py.mongodb.net/users?retryWrites=true&w=majority";
const localurl = "mongodb://localhost/users"
const usercli = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const passport = require('passport');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const socketio = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

// Veri Tabanı Bağlantısı...
// ÖNEMLİ NOT!!!!! GİTHUB KOYMADAN ÖNCE VERİTABANINA BAĞLANMA DEĞİŞKENİNİ "uri" OLARAK AYARLA!
mongoose.connect(uri , {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

mongoose.connection.on('open', () => {
    console.log('Veri Tabanı Bağlantısı Sağlandı...')
});
mongoose.connection.on('error', (err) => {
    console.log('Veritabanı Bağlantı Hatası: ', err);
});

// Görüntü Motoru Yüklüyoruz
app.set('view engine', 'ejs');


// Server'ı Dinlemeye Aldık

server = http.listen(PORT, (req, res) => {
    console.log("Server Ayağa Kaldırıldı!");
});

const io = socketio.listen(server);

io.on('connection', (socket) => {

    console.log('Yeni Birisi!');

    // JavaScript Geçerliliğinde ki Kodlar
    socket.on('chat', data => {
        io.emit('chat', data);
    });

    socket.on('yaziyor', data => {
        socket.broadcast.emit('yaziyor', data);
    });

    socket.on('siliyor', data => {
        socket.broadcast.emit('siliyor', data);
    });

    // CSS3 Geçerliliğinde ki Kodlar
    socket.on('sohbet', data => {
        io.emit('sohbet', data);
    });

    socket.on('yaziyor1', data => {
        socket.broadcast.emit('yaziyor1', data);
    });

    socket.on('siliyor1', data => {
        socket.broadcast.emit('siliyor1', data);
    });

    // Python Geçerliliğinde ki Kodlar
    socket.on('sohbet2', data => {
        io.emit('sohbet2', data);
    });

    socket.on('yaziyor2', data => {
        socket.broadcast.emit('yaziyor2', data);
    });

    socket.on('siliyor2', data => {
        socket.broadcast.emit('siliyor2', data);
    });

    // Html5 Geçerliliğinde ki Kodlar
    socket.on('sohbet3', data => {
        io.emit('sohbet3', data);
    });

    socket.on('yaziyor3', data => {
        socket.broadcast.emit('yaziyor3', data);
    });

    socket.on('siliyor3', data => {
        socket.broadcast.emit('siliyor3', data);
    });
});

// body-parser dahil ettik
app.use(bodyParser.urlencoded({ extended: false }));

// Css dosyaları ve Terminal İçin Gerekli İşlemleri Yaptık
app.use(express.static('css'));
app.use(express.static('img'));
app.use(express.static('libarys'));
app.use(morgan('dev'));

app.use(expressSession({
    secret: 'uzumlukekim',
    resave: false,
    saveUninitialized: true,
    // uri olarak değiştir
    store: MongoStore.create({mongoUrl: uri})
}));

// Yönlendirmeler - Şema
app.use('/',usercli);

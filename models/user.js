const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    kullaniciadi: {
        type: String,
        require: true
    },

    eposta: {
        type: String,
        require: true,
        unique: true
    },

    sifre:{
        type: String,
        require: true
    },

    sifre_tekrar: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true,
        default: "offline"
    },
    rank: {
        type: String,
        require: true,
        default: "uye"
    }
}, {timestamps: true} );

const User = mongoose.model('User',userSchema);
module.exports = User;

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ads');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to db!');
});

var adShema = new mongoose.Schema({
    title: String,
    text: String,
    price: Number
});

var AdModel = mongoose.model('ads', adShema);

module.exports = AdModel;


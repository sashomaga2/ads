var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ads');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to db!');
});

var adSchema = new mongoose.Schema({
    title: String,
    text: String,
    price: Number
});

var userSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    password: String
});

var AdModel = mongoose.model('ads', adSchema);
var UserModel = mongoose.model('users', userSchema);

module.exports = { AdModel: AdModel, UserModel: UserModel};


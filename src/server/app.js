/**
 * Temporaty put in src until https://github.com/angular/angular-cli/issues/677 is resolved
 */
const express = require('express');

const app = express();

const port = 3000;

const path = require('path');

//TODO move to separated module
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ads');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('we are connected!!!');
});

var adShema = new mongoose.Schema({
    title: String,
    text: String,
    price: Number,
    id: Number
});
var AdModel = mongoose.model('ads', adShema);
////////////////////////////////////////////

app.use(express.static(__dirname + '/..'));

app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../index.html'));
});

app.get('/ads', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../index.html'));
});

app.get('/ads-data', function(req, res) {
    AdModel.find(function(err, ads) {
        if (err) return console.error(err);
        res.json(ads);
    });
});

app.listen(port, function(err){
    console.log('Running server on port: ' + port);
});

module.exports = app;
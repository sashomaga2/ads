/**
 * Temporaty put in src until https://github.com/angular/angular-cli/issues/677 is resolved
 */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;

const path = require('path');

const AdModel = require('./db');

app.use(express.static(__dirname + '/..'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


//app.get('/', function(req, res) {
//    res.sendFile(path.resolve(__dirname + '/../index.html'));
//});
//
//app.get('/ads', function(req, res) {
//    res.sendFile(path.resolve(__dirname + '/../index.html'));
//});
//
//app.get('/newAd', function(req, res) {
//    res.sendFile(path.resolve(__dirname + '/../index.html'));
//});
////
app.get('/ads-data', function(req, res) {
    AdModel.find(function(err, ads) {
        if (err) {
            return console.error(err);
        }
        res.json(ads);
    });
});

app.post('/ads-data', function(req, res) {
    //TODO add server side validation
    var reqBody = req.body,
        ad = new AdModel({ title: reqBody.title, text: reqBody.text, price: Number(reqBody.price) });

    console.log('reqBody', reqBody);

    ad.save();
    //TODO add save status

    res.send('work');
});

app.get('*', function(req, res, next) {
    if(req.url.indexOf('vendor') !== -1) return next()
    res.sendFile(path.resolve(__dirname + '/../index.html'));
});

app.listen(port, function(err){
    console.log('Running server on port: ' + port);
});

module.exports = app;
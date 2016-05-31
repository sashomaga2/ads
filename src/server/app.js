/**
 * Temporaty put in src until https://github.com/angular/angular-cli/issues/677 is resolved
 */
const express = require('express');

const app = express();

const port = 3000;

const path = require('path');

app.use(express.static(__dirname + '/..'));

app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../index.html'));
});

app.get('/ads', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../index.html'));
});

app.get('/ads-data', function(req, res) {
    console.log('inside /ads-data');
    var data = [
        {
            "id": 1,
            "caption": "Caption",
            "text": "Text1"
        },
        {
            "id": 2,
            "caption": "Caption2",
            "text": "Text2"
        },
        {
            "id": 3,
            "caption": "Caption3",
            "text": "Text3"
        },
        {
            "id": 4,
            "caption": "My Ad",
            "text": "Selling shits"
        }
    ];
    res.json(data);
});

app.listen(port, function(err){
    console.log('Running server on port: ' + port);
});
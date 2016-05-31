/**
 * Temporaty put in src until https://github.com/angular/angular-cli/issues/677 is resolved
 */
const express = require('express');

const app = express();

const port = 5000;

const path = require('path');

app.use(express.static(__dirname + '/..'));

app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../index.html'));
});

app.get('/ads', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../index.html'));
});

app.listen(port, function(err){
    console.log('Running server on port: ' + port);
});

/**
 * Temporaty put in src until https://github.com/angular/angular-cli/issues/677 is resolved
 */

const express = require('express');

const app = express();

console.log("app", app);

const port = 5000;

app.get('/', function(req, res) {
    console.log('accessing adds..');
    res.send('hello world');
});

app.listen(port, function(err){
    console.log('running server on port: ' + port);
});

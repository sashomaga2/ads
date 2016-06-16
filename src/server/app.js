/**
 * Temporaty put in src until https://github.com/angular/angular-cli/issues/677 is resolved
 */

var express = require('express');
var bodyParser = require('body-parser');
/* Auth */
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();
const port = 3000;

/* Middlewares */
app.use(express.static(__dirname + '/..'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true }));
require('./passport')(app);

/* Routes */
require('./router')(app);

app.listen(port, function(err){
    console.log('Running server on port: ' + port);
});

module.exports = app;

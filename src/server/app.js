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
var path = require('path');
/* DB */
var AdModel = require('./db').AdModel;
var UserModel = require('./db').UserModel;
const STATUS = { FAIL: 0, SUCCESS: 1 };

/* Middlewares */
app.use(express.static(__dirname + '/..'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true }));
require('./passport')(app);


app.get('/ads-data', function(req, res) {
    console.log('get /ads-data');

    var id = req.query.id;
    var userId = req.query.userId;

    console.log('userId', userId);

    var query = {};

    if(id) {
        query._id = id;
    }

    if(userId) {
        query.userId = userId;
    }

    AdModel.find(query, function(err, ads) {
        if (err) {
            return console.error(err);
        }
        console.log('ads', ads);
        res.json(ads);
    });
});

app.post('/ads-data', function(req, res) {
    //TODO add server side validation
    var reqBody = req.body,
        ad = new AdModel({ userId: reqBody.userId, title: reqBody.title, text: reqBody.text, price: Number(reqBody.price) });

    console.log('reqBody', reqBody);

    ad.save();
    //TODO add save status

    res.json({ status: STATUS.SUCCESS });
});

app.post('/register-api', function(req, res) {
    var reqBody = req.body,
        result = { status: STATUS.FAIL };

    UserModel.findOne({ email: reqBody.email }, function(err, existAlready){
        if(err){
            result.error = "DB Error!";
        } else if(existAlready) {
            result.error = "Email is already used!";
        } else {
            var user = new UserModel({ email: reqBody.email });
            return user.save(function(err){
                if(err) {
                    result.error = "DB Error!";
                } else {
                    result.status = STATUS.SUCCESS
                }

                res.json(result);
            })
        }

        res.json(result);
    });
});

app.post('/login-api', function(req, res) {
    req.login(req.body, function(){
        console.log('Succesfully loged in!');
        res.json({ status: STATUS.SUCCESS, data: req.body});
    });
});

app.get('*', function(req, res, next) {

    if(req.url.indexOf('vendor') !== -1){
        // serve map files from vendor directory
        return next();
    }
    res.sendFile(path.resolve(__dirname + '/../index.html'));
});

app.listen(port, function(err){
    console.log('Running server on port: ' + port);
});

module.exports = app;

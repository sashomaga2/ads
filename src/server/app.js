/**
 * Temporaty put in src until https://github.com/angular/angular-cli/issues/677 is resolved
 */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;

const path = require('path');

const AdModel = require('./db').AdModel;
const UserModel = require('./db').UserModel;
const STATUS = { FAIL: 0, SUCCESS: 1 };

app.use(express.static(__dirname + '/..'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/ads-data', function(req, res) {
    var id = req.query.id;

    AdModel.find(id ? { _id: id } : {}, function(err, ads) {
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

app.post('/register-api', function(req, res) {
    var reqBody = req.body;
    //ad = new AdModel({ title: reqBody.title, text: reqBody.text, price: Number(reqBody.price) });

    /*
     email: String,
     firstName: String,
     lastName: String,
     password: String
    * */

    var result = { status: STATUS.SUCCESS };

    UserModel.findOne({ email: reqBody.email }, function(err, existAlready){
        console.log('findOne', existAlready);
        if(err){
            result.error = "DB Error!";
        } else if(existAlready) {
            result.error = "Email is already used!";
        } else {
            var user = new UserModel({ email: reqBody.email });
            return user.save(function(err){
                if(err) {
                    result.error = "DB Error!";
                }

                res.json(result);
                console.log('USER SAVED!!!');
            })
        }

        res.json(result);
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

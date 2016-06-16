
var AdModel = require('./db').AdModel,
    UserModel = require('./db').UserModel,
    path = require('path'),
    constants = require('./constants');

module.exports = function (app) {
    app.get('/ads-data', function(req, res) {
        var id = req.query.id,
            userId = req.query.userId,
            query = {};

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

        res.json({ status: constants.STATUS_SUCCESS });
    });

    app.post('/register-api', function(req, res) {
        var reqBody = req.body,
            result = { status: constants.STATUS_FAIL };

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
                        result.status = constants.STATUS_SUCCESS
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
            res.json({ status: constants.STATUS_SUCCESS, data: req.body});
        });
    });

    app.get('*', function(req, res, next) {

        if(req.url.indexOf('vendor') !== -1){
            // serve map files from vendor directory
            return next();
        }
        res.sendFile(path.resolve(__dirname + '/../index.html'));
    });
}


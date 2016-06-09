
var passport = require('passport');

module.exports = function(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done){
        done(null, user._id);
    });

    passport.deserializeUser(function(userId, done){
        done(null, user);
    });

    require('./local.strategy')();
}



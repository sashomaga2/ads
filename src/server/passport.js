
var passport = require('passport');

module.exports = function(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done) {
        console.log('serializeUser', user);
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    require('./local.strategy')();
}



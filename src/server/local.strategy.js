
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function() {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function(username, password, done) {
        //TODO check username and password from DB
        console.log('checking user name *************', username);
        var user = {
            username: username,
            password: password
        };

        done(null, user);
    }));
};
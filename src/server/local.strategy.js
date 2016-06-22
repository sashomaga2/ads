
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    UserModel = require('./db').UserModel;

module.exports = function() {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function(username, password, done) {
        UserModel.findOne({ email: username, password: password }, function(err, user){
            done(null, user ? exportUser(user) : null);
        });
    }));
};

function exportUser(user) {
    return { email: user.email, firstName: user.firstName, lastName: user.lastName, _id: user._id };
}
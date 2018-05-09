const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('user');
module.exports = function () {
    passport.use(new LocalStrategy((username, password, done) => {
        User.findOne({
            username
        }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'Unknown user'
                });
            }
            if (!user.authenticate(password)) {
                return done(null, false, {
                    message: 'Invalid password'
                });
            }

            if (user.approved == false && user.adminRejected == false) {
                return done(null, false, {
                    message: 'Account pending '
                });
            }

            if (user.adminRejected == true ) {
                return done(null, false, {
                    message: 'Account was rejected by administration'
                });
            }
            return done(null, user);
        });
    }));
};
var users = require('../controllers/user.server.controller');

module.exports = function (app) {
    //These are the express routes which use the user controller logic
    //still need to do signout.
    app.route('/signup')
        .get(users.renderSignup)
        .post(users.signup);
   
    app.route('/signin')
        .get(users.renderSignin)
        .post(passport.authenticate('local', {
            successRedirect: '/home',
            failureRedirect: '/signin',
            failureFlash: true
        }));
    app.route('/home')
        .get(passport.authenticate(users.renderHome));
    
    // app.route('/logout', )
    
    // app.route('/admin')
    // .get(passport)
};

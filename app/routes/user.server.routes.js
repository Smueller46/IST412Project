var users = require('../controllers/user.server.controller');

module.exports = function (app) {
    //These are the express routes which use the user controller logic
    //still need to do signout.
    app.route('/signup')
        .get(users.renderSignup)
        .post(users.signup);
    app.route('/signin')
        .get(users.renderSignin)
        .post(users.signin);
};

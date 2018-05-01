var user = require('connect-roles');
var authentication = require('passport');

module.exports = function(app) {

    var user = new ConnectRoles({
        failureHandler: function (req, res, action) {
          // optional function to customise code that runs when
          // user fails authorisation
          var accept = req.headers.accept || '';
          res.status(403);
          if (~accept.indexOf('html')) {
            res.render('access-denied', {action: action});
          } else {
            res.send('Access Denied - You don\'t have permission to: ' + action);
          }
        }
      });

      user.use(function (req, action) {
        if (!req.isAuthenticated()) return action === 'access home page';
      })
      
      //moderator users can access private page, but
      //they might not be the only ones so we don't return
      //false if the user isn't a moderator
      user.use('/admin', function (req) {
        if (req.user.role === 'faculty' ) {
          return true;
        }
      })
      
      //admin users can access all pages
      user.use(function (req) {
        if (req.user.role === 'admin') {
          return true;
        }
      });
}
var internships = require('../controllers/internships.server.controller');
var admin = require('../controllers/admin.server.controller');
var check = require('../../config/authorisation');
module.exports = function(app) {
    app.route('/internships')
        .get(internships.renderInternships)
        .post(internships.create);

    // app.route( '/internshipSearch')
    // .get(check.loggedIn, admin.read);

    // app.route('/internships/reject')
    // .get(internships.reject)
}
// module.exports = function(app) {
//     var internships = require('../controllers/internships.server.controller');

//     app.get('/internships', internships.renderInternships);
// }
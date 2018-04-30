var internships = require('../controllers/internships.server.controller');

module.exports = function(app) {
    app.route('/internships')
        .get(internships.renderInternships)
        .post(internships.create);

    app.route('/internshipSearch')
    .post(internships.read)
}
// module.exports = function(app) {
//     var internships = require('../controllers/internships.server.controller');

//     app.get('/internships', internships.renderInternships);
// }
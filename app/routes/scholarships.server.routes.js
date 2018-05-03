var scholarships = require('../controllers/scholarship.server.controller');
var admin = require('../controllers/admin.server.controller');
var check = require('../../config/authorisation');

module.exports = function (app) {
    app.route('/scholarships')
    .get(scholarships.renderScholarshipEmp)
    .post(scholarships.create)
}
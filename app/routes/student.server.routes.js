var student = require('../controllers/student.server.controller');
var scholarship = require('../controllers/scholarship.server.controller');
var internship = require('../controllers/internships.server.controller')
var check = require('../../config/authorisation')
module.exports = function (app) {

    app.route('/student/home')
    .get( check.loggedIn, student.renderHome)
    .post(student.saveFile);

    app.route('/student/appInternships')
    .get(check.loggedIn, student.renderAppInternship);

    app.route('/student/searchInternship')
    .get(check.loggedIn, internship.renderSearchInternship);

    app.route('/student/searchScholarships')
    .get(scholarship.renderSearchScholarships)
    app.route('/student/scholarships')
    .get(check.loggedIn, scholarship.renderSearchScholarships);
}
   

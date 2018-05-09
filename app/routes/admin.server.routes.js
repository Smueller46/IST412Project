var admin = require('../controllers/admin.server.controller');
var delay = require('express-delay')
module.exports = function(app) {
    // app.route('/admin')
    // .get(admin.showApproved);

    app.route('/admin/internship')
    .get(admin.showApproved)
    .post(admin.update)

    app.route('/admin/scholarship')
    .get(admin.showApproved)
    .post(admin.update)
    // app.route('/admin/scholarships')
    // .get('')

    app.route('/admin/user')
    .get(admin.showApproved)
    .post(admin.update)
};



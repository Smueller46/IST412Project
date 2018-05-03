var admin = require('../controllers/admin.server.controller');
var delay = require('express-delay')
module.exports = function(app) {
    app.route('/admin')
    .get(admin.showApproved);

    app.route('/admin/internships')
    .post(admin.update)

    app.route('/admin/scholarships')
    .get(admin.showApprovedSchol)
    .post(admin.updateSchol)
    // app.route('/admin/scholarships')
    // .get('')
};


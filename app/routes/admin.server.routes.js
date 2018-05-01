var admin = require('../controllers/admin.server.controller');
var delay = require('express-delay')
module.exports = function(app) {
    app.use(delay(1000));
    app.route('/admin')
    .get(admin.showApproved);

    app.route('/admin/internships')
    .post(admin.update)
};


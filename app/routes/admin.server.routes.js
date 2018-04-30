var admin = require('../controllers/admin.server.controller');

module.exports = function(app) {
    app.route('/admin')
    .get(admin.renderApproval)
};


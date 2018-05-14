module.exports = function (app) {
    var index = require('../controllers/index.server.controller')
app.get('/portal', index.render);
app.get('/error', index.renderError)

};

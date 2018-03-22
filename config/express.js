var express = require('express');
var path = require('path');
var logger = require('morgan');
var mysql = require('mysql');
var appRoutes = require('./routes/app');
var bodyPaser = require('body-parser');

module.exports = function () {
var app = express();

//create the mysql DB connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'secret',
    database: 'app_database'
});
//view- templating engine, lets's try handlebars. I think you all will
//find if useful
app.set('views', './app/views');
app.set('view engine', 'hbs');

app.use(bodyParser());

//allows to simply access static files rather than having to type in
//the full path name of the files
app.use(express.static('./app/views'));

require('../app/routes/index.server.routes.js')(app);
require('../app/routes/users.server.routes.js')(app);
return app;
};
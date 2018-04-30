process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var express = require('express');
var path = require('path');
var logger = require('morgan');
var mysql = require('mysql');
//var appRoutes = require('./routes/app');
var bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const config = require('./config');
module.exports = function () {
var app = express();

//create the mysql DB connection
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'user',
//     password: 'secret',
//     database: 'app_database'
// });
//view- templating engine, lets's try handlebars. I think you all will
//find if useful

app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
    }));

app.set('views', './app/views');
app.set('view engine', 'ejs');


app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//body parser is an express middleware for POST requests -> JSON
app.use(bodyParser());

//allows to simply access static files rather than having to type in
//the full path name of the files
app.use(express.static('./app/views'));

// require('./connect.js')(app);
require('../app/routes/admin.server.routes.js')(app);
require('../app/routes/student.server.routes.js')(app);
require('../app/routes/index.server.routes.js')(app);
require('../app/routes/user.server.routes.js')(app);
require('../app/routes/internships.server.routes')(app);
return app;
};
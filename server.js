//This is the first file called which starts up the web application
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const mongoose = require('./config/mongoose');
var mysql = require('./config/mysql'),
    express = require('./config/express');
const configurePassport = require('./config/passport');


var db = mongoose();
var app = express();
const passport = configurePassport();
app.listen(3000);
module.exports = app;
console.log('Server running at http://localhost:3000/');
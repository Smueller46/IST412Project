//This is the first file called which starts up the web application
var mysql = require('./config/mysql'),
    express = require('./config/express');

var db = mysql();
var app = express();

app.listen(3000);
module.exports = app;
console.log('Server running at http://localhost:3000/');
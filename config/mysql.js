var mysql = require('mysql');
//create the mysql DB connection

module.exports = function () {

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'secret',
    database: 'app_database'
});
// require('../app/models/user')
return connection;
};
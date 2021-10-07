const mysql = require('mysql');
const connection = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'password1004!',
    database: 'rail'
});

module.exports = connection;
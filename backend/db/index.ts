var mysql = require('mysql2');

// create the connection to database
const db1 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1044Code#',
    database: 'dbmsproject',
});



module.exports = db1;
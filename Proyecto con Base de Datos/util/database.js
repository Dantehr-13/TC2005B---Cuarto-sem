const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'lol',
    password: 'dantesaur10'
});

module.exports = pool.promise();

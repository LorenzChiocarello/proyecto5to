const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456789', 
    database: 'Escuela'
});

module.exports = pool;
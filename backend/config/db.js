const mysql = require('mysql2');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'maintenance_db'
});

module.exports = db;

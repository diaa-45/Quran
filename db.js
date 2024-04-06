const mysql = require('mysql');
require("dotenv").config()
// Create a connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: 'quran'
  });

module.exports = pool;
const mysql = require('mysql');
require("dotenv").config()
// Create a connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.HOST,
    user: process.env.USER,
    password: "",
    database: 'quran'
  });

module.exports = pool;
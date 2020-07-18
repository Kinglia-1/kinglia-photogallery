const mysql = require('mysql');
const { config } = require('../config.js');


const pool = mysql.createPool({
  connectionLimit: 2,
  host: 'localhost',
  user: 'root',
  password: config.mysqlpass,
  database: 'bnbphotos',
});


module.exports = pool;

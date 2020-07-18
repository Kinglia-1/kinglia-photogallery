const mysql = require('mysql');
const { config } = require('../config.js');
require('events').EventEmitter.defaultMaxListeners = 100;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: config.mysqlpass,
  database: 'bnbphotos',
});


module.exports = connection;

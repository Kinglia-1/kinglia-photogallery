const mysql = require('mysql2');
const { config } = require('../config.js');
// require('events').EventEmitter.defaultMaxListeners = 100;

const connection = mysql.createConnection({
  host: config.host,
  user: 'eric',
  password: config.mysqlpass,
  database: 'bnbphotos',
  multipleStatements: true,
  port: 3306,
});

module.exports = connection;

const Promise = require('bluebird');
const mysql = require('mysql2');
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);
const { config } = require('../config.js');
// require('events').EventEmitter.defaultMaxListeners = 100;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: config.mysqlpass,
  database: 'bnbphotos',
  multipleStatements: true,
});



module.exports = connection;

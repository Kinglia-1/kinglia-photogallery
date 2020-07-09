const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost/bnbphotos';

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((err) => console.log(err));

const db = mongoose.connection;

module.exports = db;

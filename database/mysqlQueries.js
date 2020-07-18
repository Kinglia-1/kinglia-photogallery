const coonection = require('./mysql');
// require('events').EventEmitter.defaultMaxListeners = 100;

const getPhotosByRoomId = (roomId, callback) => {


  coonection.query('select photo_url, photo_description from photos where room_id = ?', roomId, (err, results, fields) => {
    if (err) {
      console.log(err);
    } else {
      callback(null, results);
    }
  });

};

module.exports = { getPhotosByRoomId };

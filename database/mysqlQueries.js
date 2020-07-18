const pool = require('./mysql');


const getPhotosByRoomId = (roomId, callback) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      return;
    }

    connection.query('select photo_url, photo_description from photos where room_id = ?',roomId, (err, results, fields) => {
      connection.release();
      if (err) {
        console.log(err);
      } else {
        callback(null, results);
        connection.destroy();
      }
    });
    connection.on('error', (err) => {
      console.log(err);
    });
  });
};

module.exports = { getPhotosByRoomId };

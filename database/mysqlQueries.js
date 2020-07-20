// const connection = require('./mysql');
// // require('events').EventEmitter.defaultMaxListeners = 100;

// const getPhotosByRoomId = (roomId, callback) => {
//   connection.queryAsync('SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;select photo_url, photo_description from photos where room_id = ?;COMMIT', roomId)
//   .then((rows) => {
//     callback(null, rows);
//   })
//   .catch((err) => {
//     callback(err, null);
//   })
// };

// module.exports = { getPhotosByRoomId };

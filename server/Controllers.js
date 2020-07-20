const Models = require('./Models.js');
const connection = require('../database/mysql.js');
const { getPhotosByRoomId } = require('../database/mysqlQueries.js');
// require('events').EventEmitter.defaultMaxListeners = 100;

// const getPhotosSql = (req, res) => {
//   const id = req.params.roomId;
//   connection.query('select photo_url, photo_description from photos where room_id = ?', [id], (err, rows) => {
//     if (err) {
//       console.log(err)
//     } else {
//       const len = rows.length;
//       for (let i = 0; i < len; i++) {
//         rows[i].photoUrl = rows[i].photo_url;
//         delete rows[i].photo_url;
//         rows[i].photoDescription = rows[i].photo_description;
//         delete rows[i].photo_description;
//       }
//       res.send(rows);
//     }

//   });
// };
// START TRANSACTION READ ONLY;

const getPhotosSql = (req, res) => {
  const id = req.params.roomId;
  connection.promise().execute('select photo_url, photo_description from photos where room_id = ?', [id])
    .then((data) => {
      const len = data.length;
      for (let i = 0; i < len; i++) {
        data[i].photoUrl = data[i].photo_url;
        delete data[i].photo_url;
        data[i].photoDescription = data[i].photo_description;
        delete data[i].photo_description;
      }
      return data;
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
};

const postSaveSql = (req, res) => {
  console.log(req.body);
};

function getPhotos(req, res) {
  const { roomId } = req.params;
  Models.getPhotos(roomId, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      // console.log(data);
      res.status(200).send(data);
    }
  });
}

function postSaveToList(req, res) {
  const { roomId } = req.params;
  const { name, saved } = req.body;
  console.log('req body', req.body);
  Models.postSaveToList(roomId, name, saved, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data);
    }
  });
}

function updateSaveToList(req, res) {
  const { roomId } = req.params;
  const { id, name, saved } = req.body;
  Models.updateSaveToList(roomId, id, name, saved, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data);
    }
  });
}

const deleteItem = (req, res) => {
  console.log('trying to delete');
};
module.exports = {
  getPhotos, postSaveToList, updateSaveToList, deleteItem, getPhotosSql, postSaveSql,
};

const Models = require('./Models.js');
const { getPhotosByRoomId } = require('../database/mysqlQueries.js');

function getPhotosSqL(req, res) {
  const { roomId } = req.params;
  getPhotosByRoomId(roomId, (err, data) => {
    if (err) {
      console.log(err);
      res.send(err);
    }
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      data[i].photoUrl = data[i].photo_url;
      delete data[i].photo_url;
      data[i].photoDescription = data[i].photo_description;
      delete data[i].photo_description;
    }
    res.send(data);
  });
}

function getPhotos(req, res) {
  const { roomId } = req.params;
  Models.getPhotos(roomId, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      console.log(data);
      res.status(200).send(data);
    }
  });
}

function postSaveToList(req, res) {
  const { roomId } = req.params;
  const { name, saved } = req.body;
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
  getPhotos, postSaveToList, updateSaveToList, deleteItem, getPhotosSqL,
};

/* eslint-disable quote-props */
const Gallery = require('../database/Gallery.js');

function getPhotos(roomId, callback) {
  Gallery.find({ 'room_id': roomId }, callback);
}

function postSaveToList(roomId, listName, savedStatus, callback) {
  Gallery.update({ room_id: roomId },
    {
      $push: {
        save_status: {
          name: listName,
          saved: savedStatus,
        },
      },
    }, callback);
}

function updateSaveToList(roomId, id, listName, savedStatus, callback) {
  Gallery.update({ room_id: roomId, 'save_status._id': id },
    {
      $set: {
        'save_status.$.name': listName,
        'save_status.$.saved': savedStatus,
      },
    }, callback);
}

const deleteItem = (roomId, listName, callback) => {
  Gallery.delete({ room_id: roomId });
};

module.exports = {
  getPhotos, postSaveToList, updateSaveToList, deleteItem,
};

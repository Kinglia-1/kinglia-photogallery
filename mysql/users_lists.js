/* eslint-disable camelcase */
const fs = require('fs');
const path = require('path');
const faker = require('faker');


const usersFile = path.join(__dirname, '../csv/users.csv');
const writeUsers = fs.createWriteStream(usersFile);
writeUsers.write('user_id,user_name\n', 'utf8');

const favListsFile = path.join(__dirname, '../csv/fav_lists.csv');
const writeFavLists = fs.createWriteStream(favListsFile);
writeFavLists.write('list_id,list_name,user_id\n', 'utf8');

const favRoomFile = path.join(__dirname, '../csv/fav_rooms.csv');
const writeFavRooms = fs.createWriteStream(favRoomFile);
writeFavRooms.write('fav_room_id,list_id,room_id\n', 'utf8');

const listsArray = [];
let listsLoaded = false;

const writeMassiveUser = (start, number, callback) => {
  let i = start;
  const stop = start + number;
  let memory = true;
  const write = () => {
    memory = true;
    while (memory && i < stop) {
      if (i % (number / 10) === 0) {
        console.log('wrote 1/10 of file');
      }
      const user_id = i;
      const user_name = faker.internet.userName();
      i += 1;
      const string = `${user_id},${user_name}\n`;
      if (i === 0) {
        writeUsers.write(string, 'utf8', callback);
      } else {
        memory = writeUsers.write(string, 'utf8');
      }
    }
    if (i < stop) {
      console.log('need to drain users');
      writeUsers.once('drain', write);
    }
    if (i === stop) {
      console.log('users finished');
    }
  };
  write();
};

const writeMassiveLists = (start, number, callback) => {
  let i = start;
  const stop = start + number;
  let memory = true;
  let listId = 0;
  const write = () => {
    memory = true;
    while (memory && i < stop) {
      if (i % (number / 10) === 0) {
        console.log('wrote 1/10 of file');
      }
      const user_id = i;
      i += 1;
      const random = Math.floor(Math.random() * (6 - 1)) + 1
      for (let k = 0; k < random; k++) {
        const list_id = listId;
        listsArray.push(listId);
        listId += 1;
        const list_name = faker.address.city();
        const string = `${list_id},${list_name},${user_id}\n`;
        if (i === stop) {
          writeFavLists.write(string, 'utf8', callback);
        } else {
          memory = writeFavLists.write(string, 'utf8');
        }
      }
    }
    if (i < stop) {
      console.log('need to drain fav lists');
      writeFavLists.once('drain', write);
    }
    if (i === stop) {
      console.log('fav lists finished');
      console.log('list array', listsArray.length);
      listsLoaded = true;
    }
  };
  write();
};

const writeMassiveFavRooms = (callback) => {
  let i = 0;
  const listIdsLen = listsArray.length;
  // const stop = start + number;
  let memory = true;
  let faveRoomId = 0;
  const write = () => {
    memory = true;
    while (memory && i < listIdsLen) {
      if (i % (Math.floor(listIdsLen / 10)) === 0) {
        console.log('wrote 1/10 of file');
      }
      const list_id = i;
      i += 1;
      const random = Math.floor(Math.random() * (5 - 1)) + 1;
      for (let k = 0; k < random; k++) {
        const fav_room_id = faveRoomId;
        faveRoomId += 1;
        const randomRoomId = Math.floor(Math.random() * (10000001 - 1)) + 1;
        const string = `${fav_room_id},${list_id},${randomRoomId}\n`;
        if (i === listIdsLen) {
          writeFavRooms.write(string, 'utf8', callback);
        } else {
          memory = writeFavRooms.write(string, 'utf8');
        }
      }
    }
    if (i < listIdsLen) {
      console.log('need to drain fav rooms');
      writeFavRooms.once('drain', write);
    }
    if (i === listIdsLen) {
      console.log('fav room finished');
    }
  };
  write();
};





writeMassiveUser(0, 10000, () => {
  writeUsers.end();
  console.log('writing users finished')

});

writeMassiveLists(0, 10000, () => {
  writeFavLists.end();
  console.log('writing fav lists finished')
  writeMassiveFavRooms(() => {
    writeFavRooms.end();
    console.log('writing fav rooms finished');
  });
});

// writeMassiveFavRooms(() => {
//   writeFavRooms.end();
//   console.log('writing fav rooms finished');
// });


//   writeMassiveFavRooms(listsArray, () => {
//     writeFavRooms.end(() => {
//       console.log('writing fave rooms finished');
//     });
//   });


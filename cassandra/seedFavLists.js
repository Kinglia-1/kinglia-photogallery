const fs = require('fs');
const faker = require('faker');
const TimeUuid = require('cassandra-driver').types.TimeUuid;
const csvWriter = require('csv-write-stream');
const path = require('path');
const { roomRecords } = require('./normalData.js');

const userNRecords = 100001;

const generateFavLists = () => {
  const favLists = [];
  let roomIdArr = [];
  const randomNLists = Math.floor(Math.random() * 11);
  const randomNRooms = Math.floor(Math.random() * 11);

  for (let k = 0; k < randomNRooms; k++) {
    const randomRoomId = Math.floor(Math.random() * roomRecords - 1) + 1;
    roomIdArr.push(randomRoomId);
    roomIdArr = [...new Set(roomIdArr)];
  }

  for (let i = 0; i < randomNLists; i++) {
    const listId = TimeUuid.fromDate(faker.date.between('2017-01-01', '2020-07-01'));
    const list = {
      list_id: listId,
      list_name: faker.address.city,
      fav_rooms: roomIdArr,
    };

    favLists.push(list)
  }
  console.log(favLists)
  return favLists;
};

const generateUsers = () => {
  const usersArr = [];
  for (let i = 1; i < userRecords; i++) {
    const user = {
      user_id: TimeUuid.fromDate(faker.date.between('2017-01-01', '2020-07-01')),
      user_name: faker.userName,
      fav_lists: generateFavLists(),
    };
  }
  return usersArr;
};

const writeFavListsToCsv = (roomRecords, fileNum = 1) => {
  const filePath = path.join(__dirname, `../csv/cassfavlists${fileNum}.csv`);
  const fsStream = fs.createWriteStream(filePath);
  writer.pipe(fsStream);
  // denormalize
  for (let i = 0; i < len - 1; i++) {
    for (let k = 0; k < photosArr.length; k++) {
      writer.write({

      });
    }
  }
  writer.end(() => {
    fsStream.on('finish', () => {
      console.log('=== writeFavListsToCsv written successfully, stopping application ===');
      process.exit();
    });
  });
};

generateFavLists();

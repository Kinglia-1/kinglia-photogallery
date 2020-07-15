const fs = require('fs');
const faker = require('faker');
const TimeUuid = require('cassandra-driver').types.TimeUuid;
const csvWriter = require('csv-write-stream');
const writer = csvWriter();
const writerRooms = csvWriter();
const path = require('path');
const dayjs = require('dayjs')
const { roomRecords } = require('./normalData.js');

const userNRecords = 1000000;
const listArray = [];
const writeFavRooms = (listIds, fileNum = 1) => {
  const filePath = path.join(__dirname, `../csv/cassfavRooms${fileNum}.csv`);
  const writable = fs.createWriteStream(filePath);
  writerRooms.pipe(writable);
  for (let i = 0; i < listIds.length; i++) {
    const listId = listIds[i];
    const randomNRooms = Math.floor(Math.random() * (6 - 1)) + 1;
    for (let k = 0; k < randomNRooms; k++) {
      const randomRoomId = Math.floor(Math.random() * 1000);
      writerRooms.write({
        list_id: listId,
        room_id: randomRoomId,
        room_name: faker.address.streetName(),
        created_at: dayjs(faker.date.between('2017-01-01', '2020-07-01')).format(),
      });
    }
  }
  writerRooms.end(() => {
    writable.on('finish', () => {
      console.log('=== FAV ROOMS written successfully, stopping application ===');
      process.exit();
    });
  });
}

const writeFavListsToCsv = (fileNum = 1) => {
  const filePath = path.join(__dirname, `../csv/cassfavlists${fileNum}.csv`);
  const fsStream = fs.createWriteStream(filePath);
  writer.pipe(fsStream);
  // denormalize
  for (let i = 0; i < userNRecords; i++) {
    const userId = TimeUuid.fromDate(faker.date.between('2017-01-01', '2020-07-01'));
    const randomNLists = Math.floor(Math.random() * (5 - 1)) + 1;
    for (let k = 0; k < randomNLists; k++) {
      const listId = TimeUuid.fromDate(faker.date.between('2017-01-01', '2020-07-01'));
      listArray.push(listId);
      writer.write({
        user_id: userId,
        list_id: listId,
        list_name: faker.address.city(),
      });
    }
  }
  writer.end(() => {
    fsStream.on('finish', () => {
      nextCsv = true;
      console.log(
        'writing fav lists finished'
      )
    });
  });
  return listArray;
};


writeFavListsToCsv();
writeFavRooms(listArray);

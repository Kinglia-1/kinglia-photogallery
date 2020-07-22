/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const fs = require('fs');
const path = require('path');
const faker = require('faker');
const { photosUrls } = require('../cassandra/photosUrls.js');

const roomsFile = path.join(__dirname, '../csv/rooms.csv');
const writeRooms = fs.createWriteStream('/Volumes/seagate/SDC_CSV_FILES/rooms.csv');

const nRooms = 2000000;
const startIndex = 8000001;

const photosFile = path.join(__dirname, '../csv/photos.csv');
const writePhotos = fs.createWriteStream(`/Volumes/seagate/SDC_CSV_FILES/photos${startIndex}.csv`);

const writeMassiveRooms = (start, number, callback) => {
  let i = start;
  const stop = start + number;
  let memory = true;
  const write = () => {
    memory = true;
    while (memory && i < stop) {
      if (i % (number / 10) === 0) {
        console.log('wrote 1/10 of file');
      }
      const room_id = i;
      i += 1;
      const room_name = faker.address.streetName();
      const string = `0,${room_name}\n`;
      if (i === stop) {
        writeRooms.write(string, 'utf8', callback);
      } else {
        memory = writeRooms.write(string, 'utf8');
      }
    }
    if (i < stop) {
      writeRooms.once('drain', write);
    }
  };
  write();
};

const randomUrl = () => {
  const len = photosUrls.length;
  const random = Math.floor(Math.random() * len);
  return photosUrls[random];
};

const writeMassivePhotos = (start, number, callback) => {
  let i = start;
  const stop = start + number;
  let memory = true;
  let photoId = 0;
  const write = () => {
    memory = true;
    while (memory && i < stop) {
      if (i % (number / 10) === 0) {
        console.log('wrote 1/10 of file');
      }
      const room_id = i;
      i += 1;
      const randomNPhotos = Math.floor(Math.random() * (8 - 6)) + 5;
      for (let k = 0; k < randomNPhotos; k++) {
        photoId += 1;
        const photo_description = faker.company.catchPhrase();
        const photo_url = randomUrl();
        const photo_order = k;
        const string = `0,${photo_description},${photo_url},${photo_order},${room_id}\n`;
        if (i === stop) {
          writePhotos.write(string, 'utf8', callback);
        } else {
          memory = writePhotos.write(string, 'utf8');
        }
      }
    }
    if (i < stop) {
      writePhotos.once('drain', write);
    }
  };
  write();
};

// writeMassiveRooms(1, 10000000, () => {
//   writeRooms.end();
//   console.log('writing rooms finished');
// });

writePhotos.write('photo_id,photo_description,photo_url,photo_order,room_id\n');
writeMassivePhotos(startIndex, nRooms, () => {
  writePhotos.end();
  console.log('writing photos finished');
});

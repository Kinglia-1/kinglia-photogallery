/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const fs = require('fs');
const path = require('path');
const faker = require('faker');
const { photosUrls } = require('../cassandra/photosUrls.js');

const roomsFile = path.join(__dirname, '../csv/rooms.csv');
const writeRooms = fs.createWriteStream(roomsFile);
writeRooms.write('room_id,room_name\n', 'utf8');

const photosFile = path.join(__dirname, '../csv/photos.csv');
const writePhotos = fs.createWriteStream(photosFile);
writePhotos.write('photo_id,photo_description,photo_url,photo_order,room_id\n');

const writeMassiveRooms = (start, number, callback) => {
  let i = start;
  const stop = start + number;
  let memory = true;
  const write = () => {
    memory = true;
    while (memory && i < stop) {
      if (i % (stop / 10) === 0) {
        console.log('wrote 1/10 of file');
      }
      const room_id = i;
      i += 1;
      const room_name = faker.address.streetName();
      const string = `${room_id},${room_name}\n`;
      if (i === 0) {
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
  const write = () => {
    memory = true;
    while (memory && i < stop) {
      if (i % (stop / 10) === 0) {
        console.log('wrote 1/10 of file');
      }
      const room_id = i;
      i += 1;
      const randomNPhotos = Math.floor(Math.random() * (8 - 5)) + 5;
      for (let k = 0; k < randomNPhotos; k++) {
        const photo_id = k;
        const photo_description = faker.company.catchPhrase();
        const photo_url = randomUrl();
        const photo_order = k;
        const string = `${photo_id},${photo_description},${photo_url},${photo_order},${room_id}\n`;
        if (i === 0) {
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

// writeMassiveRooms(1, 1000000, () => {
//   writeRooms.end(() => {
//     writeRooms.on('finish', () => {
//       console.log('writing rooms finished');
//     });
//   });
// });

writeMassivePhotos(1, 100000, () => {
  writePhotos.end(() => {
    writePhotos.on('finish', () => {
      console.log('writing rooms finished');
    });
  });
});

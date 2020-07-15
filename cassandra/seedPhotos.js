/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
const fs = require('fs');
const path = require('path');
const TimeUuid = require('cassandra-driver').types.TimeUuid;
const faker = require('faker');


const { photosUrls } = require('./photosUrls.js');

const roomRecords = 2000000;
const startIndex = 2000001;
//change this to N number of records

const filePath = path.join(__dirname, `../csv/photos_by_room${startIndex}.csv`);
const writePhotos = fs.createWriteStream(`/Volumes/Seagate Backup Plus Drive/SDC_CSV_FILES/photos_by_room${startIndex}.csv`);
writePhotos.write('room_id,photo_id,photo_url,photo_description,photo_order\n', 'utf8');


const randomUrl = () => {
  const len = photosUrls.length;
  const random = Math.floor(Math.random() * len);
  return photosUrls[random];
};

const write10MillionPhotos = (start, number, callback) => {
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
      const randomNPhotos = Math.floor(Math.random() * (8 - 5)) + 5;
      for (let k = 0; k < randomNPhotos; k++) {
        const photo_id = TimeUuid.fromDate(faker.date.between('2017-01-01', '2020-07-01'));
        const photo_description = faker.company.catchPhrase();
        const photo_url = randomUrl();
        const photo_order = k;
        const string = `${room_id},${photo_id},${photo_url},${photo_description},${photo_order}\n`;
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

write10MillionPhotos(startIndex, roomRecords, () => {
  writePhotos.end();
  console.log('writing photos finished');
});


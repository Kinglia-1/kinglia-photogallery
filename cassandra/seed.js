const fs = require('fs');
const faker = require('faker');
const TimeUuid = require('cassandra-driver').types.TimeUuid;
const csvWriter = require('csv-write-stream');
const path = require('path');

const writer = csvWriter();
const { getPhotos } = require('./sdk');

//change this to N number of records
const nRecords = 10001;

// generate normalized data first
const generatePhotosData = (urls) => {
  const newUrls = urls;
  const photosData = [];
  const photoUrls = [];
  const randomNPhotos = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
  const whichPhotoIndex = Math.floor(Math.random() * urls.length);
  for (let i = 0; i < randomNPhotos + 1; i++) {
    photoUrls.push(newUrls[i]);
    newUrls.splice(i, 1);
    const photoData = {
      photo_id: TimeUuid.fromDate(faker.date.between('2017-01-01', '2020-07-01')), // get timeuuid between dates
      photo_url: photoUrls[i],
      photo_description: `${faker.company.bs()} ${faker.company.bs()}`,
      photo_name: faker.company.catchPhraseDescriptor(),
      photo_order: i,
    };
    photosData.push(photoData);
  }
  return photosData;
};

const generateRoomsData = (photosData) => {
  const roomsData = [];
  for (let i = 1; i < nRecords; i++) {
    const data = {
      room_id: i,
      photos: photosData,
    };
    roomsData.push(data);
  }
  return roomsData;
};


const photosByRoomCsv = (roomData) => {
  const filePath = path.join(__dirname, '../csv/image_urls.csv');
  const fsStream = fs.createWriteStream(filePath);
  writer.pipe(fsStream);
  for (let i = 0; i < nRecords - 1; i++) {
    const roomId = roomData[i].room_id;
    const photosArr = roomData[i].photos;
    for (let k = 0; k < photosArr.length; k++) {
      writer.write({
        room_id: roomId,
        photo_id: photosArr[k].photo_id,
        photo_url: photosArr[k].photo_url,
        photo_description: photosArr[k].photo_description,
        photo_name: photosArr.photo_name,
        photo_order: photosArr.photo_order,
      });
    }
  }
  writer.end(() => {
    fsStream.on('finish', () => {
      console.log('=== CSV written successfully, stopping application ===');
      process.exit();
    });
  });
};

// get photo urls first before we write to file
getPhotos()
  .then((urls) => {
    return generatePhotosData(urls);
  })
  .then((photosData) => {
    return generateRoomsData(photosData);
  })
  .then((roomData) => {
    photosByRoomCsv(roomData);
  });


// .then((urls) => {
//   generatePhotosByRoom(urls);
// });

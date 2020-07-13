const faker = require('faker');
const TimeUuid = require('cassandra-driver').types.TimeUuid;
const { photosUrls } = require('./photosUrls.js');

const roomRecords = 10001;
//change this to N number of records
// X10 for photo records
// console.log(photosUrls)
//normal data
const generatePhotosData = (urls) => {
  const newUrls = Array.from(urls);
  const photosData = [];
  const urlsData = [];
  const randomNPhotos = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
  for (let i = 0; i < randomNPhotos + 1; i++) {
    urlsData.push(newUrls[i]);
    newUrls.splice(i, 1);
    const photoData = {
      photo_id: TimeUuid.fromDate(faker.date.between('2017-01-01', '2020-07-01')), // get timeuuid between dates
      photo_url: photosUrls[i],
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
  for (let i = 1; i < roomRecords; i++) {
    const data = {
      room_id: i,
      photos: photosData,
    };
    roomsData.push(data);
  }
  return roomsData;
};
const photosData = generatePhotosData(photosUrls);
const roomsData = generateRoomsData(photosData);
// console.log(roomsData[1]);

module.exports = { roomsData, roomRecords };

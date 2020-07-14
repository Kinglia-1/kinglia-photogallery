/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../csv/cassphotos1.csv');
const writePhotos = fs.createWriteStream(filePath);
writePhotos.write('room_id,photo_id,photo_url,photo_description,photo_name,photo_order\n', 'utf8');

const { photosUrls } = require('./photosUrls.js');

const roomRecords = 1000001;
//change this to N number of records

//normal data
const generatePhotosData = (urls) => {
  const newUrls = Array.from(urls);
  const photosData = [];
  const urlsData = [];
  const randomNPhotos = Math.floor(Math.random() * (8 - 5 + 1)) + 5;
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
    photosData[i] = photoData;
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
    roomsData[i - 1] = data;
  }
  return roomsData;
};

const photosData = generatePhotosData(photosUrls);
const roomsData = generateRoomsData(photosData);

const allPhotos = (roomData) => {
  const result = [];
  const len = roomData.length;
  let photoIndex = 0;
  for (let i = 0; i < len; i++) {
    const roomId = roomData[i].room_id;
    const photosArr = roomData[i].photos;
    for (let k = 0; k < photosArr.length; k++) {
      const room_id = roomId;
      const photo_id = photosArr[k].photo_id;
      const photo_url = photosArr[k].photo_url;
      const photo_description = photosArr[k].photo_description;
      const photo_name = photosArr[k].photo_name;
      const photo_order = photosArr[k].photo_order;
      const data = `${room_id},${photo_id},${photo_url},${photo_description},${photo_name},${photo_order}\n`;
      result[photoIndex] = data;
      photoIndex += 1;
    }
  }
  return result;
};

const writeMassivePhotos = (writer, data, callback) => {
  let i = 0;
  let dataIndex = 0;
  const write = () => {
    let ok = true;
    do {
      if (i % 1000000 === 0) {
        // writer.once('drain', write);
        console.log('wrote 1MM')
      }
      i += 1;
      if (i === 0) {
        writer.write(data[dataIndex], 'utf-8', callback);
      } else {
        ok = writer.write(data[dataIndex], 'utf-8');
      }
      dataIndex += 1;
    } while (i < data.length && ok);
    if (i < data.length) {
      writer.once('drain', write);
    }
  };

  write();
};

writeMassivePhotos(writePhotos, allPhotos(roomsData), () => {
  writePhotos.end(() => {
    console.log('writing finished')
  });
});

// // denormalize data and write to CSV
// const writePhotosToCsv = (roomData, fileNum = 1) => {
//   const filePath = path.join(__dirname, `../csv/cassphotos${fileNum}.csv`);
//   const fsStream = fs.createWriteStream(filePath);
//   writer.pipe(fsStream);
//   // denormalize
//   const len = roomData.length;
//   for (let i = 0; i < len - 1; i++) {
//     const roomId = roomData[i].room_id;
//     const photosArr = roomData[i].photos;
//     for (let k = 0; k < photosArr.length; k++) {
//       const memory = writer.write({
//         room_id: roomId,
//         photo_id: photosArr[k].photo_id,
//         photo_url: photosArr[k].photo_url,
//         photo_description: photosArr[k].photo_description,
//         photo_name: photosArr.photo_name,
//         photo_order: photosArr.photo_order,
//       });
//       if(memory === false) {
//         console.log('memory IS OUTTTTTTTT')
//       }
//     }
//   }
//   writer.end(() => {
//     fsStream.on('finish', () => {
//       console.log('=== CSV written successfully, stopping application ===');
//       process.exit();
//     });
//   });
// };


// get photo urls first before we write to file
// getPhotos()
//   .then(urls => generatePhotosData(urls))
//   .then(photosData => generateRoomsData(photosData))
//   .then((roomData) => {
//     writePhotosToCsv(roomData, 2);
//   });
// then favlists
// then fav rooms

const fs = require('fs');
const faker = require('faker');
const csvWriter = require('csv-write-stream');
const path = require('path');
const writer = csvWriter();
const { getPhotos } = require('./sdk');

const generateUrls = (urls) => {
  const filePath = path.join(__dirname, '../csv/image_urls.csv');
  const fsStream = fs.createWriteStream(filePath);
  writer.pipe(fsStream);
  for (let i = 0; i < urls.length; i++) {
    writer.write({
      room_id: i,
      url: urls[i],
    });
  }
  writer.end(() => {
    fsStream.on('finish', () => {
      console.log('=== CSV written successfully, stopping application ===');
      process.exit();
    });
  });
};

//get photo urls first before we write to file
getPhotos()
  .then((urls) => {
    generateUrls(urls);
  });

const fs = require('fs');
const path = require('path');
const csvWriter = require('csv-write-stream');

const writer = csvWriter();
const faker = require('faker');

const writecsv = () => {
  const filePath = path.join(__dirname, '../csv/testcsvwriter.csv');
  const writable = fs.createWriteStream(filePath);
  writer.pipe(writable);

  let i = 0;
  while (i < 80000000) {
    if (i % 10000000 === 0) {
      console.log('wrote 10MM');
    }
    writer.write({
      id: i,
      user_name: faker.internet.userName(),
      avatar: faker.image.avatar(),
    });
    i++;
  }
  writer.end(() => {
    console.log('writing finished');
  });
};

writecsv();

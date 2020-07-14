/* eslint-disable camelcase */
const fs = require('fs');
const path = require('path');
const faker = require('faker');


const usersFile = path.join(__dirname, '../csv/users.csv');
const writeUsers = fs.createWriteStream(usersFile);
writeUsers.write('user_id,user_name\n', 'utf8');

const writeMassiveUser = (start, number, callback) => {
  let i = start;
  const stop = start + number;
  let memory = true;
  const write = () => {
    memory = true;
    while (memory && i < stop) {
      if (i % (stop / 10) === 0) {
        console.log('wrote 1/10 of file');
      }
      const user_id = i;
      const user_name = faker.name.findName();
      i += 1;
      const string = `${user_id},${user_name}\n`;
      if (i === 0) {
        writeUsers.write(string, 'utf8', callback);
      } else {
        memory = writeUsers.write(string, 'utf8');
      }
    }
    if (i < stop) {
      writeUsers.once('drain', write);
    }
  };
  write();
};

writeMassiveUser(0, 1000000, () => {
  writeUsers.on('finish', () => {
    console.log('writing users finished');
  });
});

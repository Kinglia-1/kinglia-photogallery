const fs = require('fs');
const path = require('path');
const faker = require('faker');


const usersFile = path.join(__dirname, '../csv/users.csv');
const writeUsers = fs.createWriteStream(usersFile);
writeUsers.write('user_id\n', 'utf8');

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
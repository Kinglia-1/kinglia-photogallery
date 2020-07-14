const fs = require('fs');
const path = require('path');
const faker = require('faker');
const filePath = path.join(__dirname, '../csv/rooms.csv');
const writeRooms = fs.createWriteStream(filePath);
writeRooms.write('room_id,room_name\n');


const writeMassiveRooms = () => {
  let i = 1;
  let memory = true;
  const write() => {
    memory = true;
    while(memory && i < 1000001) {
      if (i % 100000 === 0) {
        console.log('wrote 10000');
      }
      const room_id = i;
      i++
      const room_name = faker.address.streetName()
    }
  }
}
const faker = require('faker');
const fs = require('fs');
const pool = require('./postgresDb');


var createStream = fs.createWriteStream('DataSeedingFile.txt');

var wirteFile = (array) => {
  array.forEach(record => {

    createStream.write(record + '\n');
  });

};

var writeTenMillionRecords = () => {
  var dataArray = [];
  var count = 0;
  for (var i = 0; i < 1000000; i++) {
    dataArray.push(faker.name.findName());
    dataArray.push(faker.date.month() + ' 2021');
    dataArray.push(`https://airbnbpp.s3-us-west-1.amazonaws.com/${faker.random.number({min: 0, max: 199})}.jpg`);
    dataArray.push(faker.lorem.sentences(6));
    dataArray.push(faker.random.number(100));
    dataArray.push(faker.random.boolean());
    dataArray.push(faker.random.boolean());
    dataArray.push(i);
    count += 1;

    //dump to file once 1000 records are created
    if (count === 1000) {
      wirteFile(dataArray);
      count = 0;
      dataArray = [];
    }

  }
  createStream.end();
};



// writeTenMillionRecords();

var writeTenMillionRecordsIntoDb = async () => {

  try {
    for (var i = 0; i < 10000000; i++) {
      const hostName = faker.name.findName();
      const dateJoined = faker.date.month() + ' 2021';
      const profilePic = `https://airbnbpp.s3-us-west-1.amazonaws.com/${faker.random.number({min: 0, max: 199})}.jpg`;
      const hostDescription = faker.lorem.sentences(6);
      const reviewCount = faker.random.number(100);
      const isVerified = faker.random.boolean();
      const isSuperhost = faker.random.boolean();
      const listingID = i;

      const newHost = await pool.query('INSERT INTO hostinformation (host_name, date_joined, profile_pic, host_description, review_COUNT, is_verified, is_superhost, listing_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8)', [hostName, dateJoined, profilePic, hostDescription, reviewCount, isVerified, isSuperhost, listingID]);
      console.log('successsfully added host');
    }
  } catch (err) {
    console.log(err);
  }
};

writeTenMillionRecordsIntoDb();
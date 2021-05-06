const faker = require('faker');
const fs = require('fs');

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
  // dataArray.forEach(record => {
  //   createStream.write(record + '\n');
  // });
  // createStream.end();
  createStream.end();
};



writeTenMillionRecords();
const { Sequelize, Model, DataTypes } = require('sequelize');

const faker = require('faker');
const fs = require('fs');
const pool = require('./postgresDb');
const Pool = require('pg').Pool;
const path = require('./DataSeedingFile.csv')

//sequelize constants

const user = 'vinayb';
const host = 'localhost';
const database = 'airbnb1';
const password = 'qwerty';
const port = 5432;

const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: 'postgres',
  logging: false
})

//create Sequelize model

class Airbnb extends Model {}

Airbnb.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  host_name: {
    type: DataTypes.STRING
  },
  date_joined: {
    type: DataTypes.TEXT
  },
  profile_pic: {
    type: DataTypes.TEXT
  },
  host_description: {
    type: DataTypes.TEXT
  },
  review_count: {
    type: DataTypes.INTEGER
  },
  is_verified: {
    type: DataTypes.BOOLEAN
  },
  is_superhost: {
    type: DataTypes.BOOLEAN
  },
  listing_id: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'airbnb',
  timestamps: false
}, {
  freezeTableName: true // Model tableName will be the same as the model name
})

//From file

const pool1 = new Pool({
  user: 'vinayb',
  password: 'qwerty',
  host: 'localhost',
  port: 5432,
  database: 'airbnb1'
});

var createStream = fs.createWriteStream('DataSeedingFile.csv');

var wirteFile = (array) => {
  array.forEach(record => {

    createStream.write(record + ',');
    console.log('created');
  });

};

// File creation with 10M records
var writeTenMillionRecords = () => {
  var dataArray = [];
  var count = 0;
  for (var i = 0; i < 10000000; i++) {
    dataArray.push(faker.name.findName());
    dataArray.push(faker.date.month() + ' 2021');
    dataArray.push(`https://airbnbpp.s3-us-west-1.amazonaws.com/${faker.random.number({min: 0, max: 199})}.jpg`);
    dataArray.push(faker.lorem.sentences(1));
    dataArray.push(faker.random.number(100));
    dataArray.push(faker.random.boolean());
    dataArray.push(faker.random.boolean());
    dataArray.push(i);
    count += 1;

    //dump to file once 1000 records are created
    if (count === 10) {
      wirteFile(dataArray);
      count = 0;
      dataArray = [];
    }

  }
  createStream.end();
};


// Plain Insert
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

// Inserting with Sequilize
var writeTenMillionRecordsIntoDbSequilze = async () => {
  try {
    for (var i = 0; i < 10000000; i++){
      const hostName = faker.name.findName();
      const dateJoined = faker.date.month() + ' 2021';
      const profilePic = `https://airbnbpp.s3-us-west-1.amazonaws.com/${faker.random.number({min: 0, max: 199})}.jpg`;
      const hostDescription = faker.lorem.sentences(6);
      const reviewCount = faker.random.number(100);
      const isVerified = faker.random.boolean();
      const isSuperhost = faker.random.boolean();
      const listingID = i;

      const seqHost = await Airbnb.create({
        host_name: hostName,
        date_joined: dateJoined,
        profile_pic: profilePic,
        host_description: hostDescription,
        review_count: reviewCount,
        is_verified: isVerified,
        is_superhost: isSuperhost,
        listing_id: listingID
      });
      console.log('Entries added', i)
    }
  } catch (err) {
    console.log(err);
  }

}

// Insertting with csv file to Postgres
var writetoDBFromFile = async () => {
  // var path = '/DataSeedingFile.txt';
  try {
    await pool1.query(`COPY hostinformation1 FROM ${path} (DELIMITER ',')`);
  } catch (err) {
    console.log('Cannot add Entries', err);
  }
}

// writeTenMillionRecords();
writeTenMillionRecordsIntoDb();
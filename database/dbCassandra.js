var cassandra = require('cassandra-driver');
const faker = require('faker');

var client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1'
});
client.connect((err, result) => {
  console.log('cassandra connected');
});



var writeTenMillionRecordsIntoCassandra = async () => {

  try {
    for (var i = 0; i < 10000000; i++) {
      const hostName = faker.name.findName();
      const dateJoined = faker.date.month() + ' 2021';
      const profilePic = `https://airbnbpp.s3-us-west-1.amazonaws.com/${faker.random.number({min: 0, max: 199})}.jpg`;
      const hostDescription = faker.lorem.sentences(6);
      const reviewCount = faker.random.number(100);
      const isVerified = faker.random.boolean();
      const isSuperhost = faker.random.boolean();
      const listingID = Number(i);

      var id = cassandra.types.uuid();
      const newHost = 'INSERT INTO airbnb.hostinformation1 (id, host_name, date_joined, profile_pic, host_description, review_COUNT, is_verified, is_superhost, listing_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)';

      await client.execute(newHost, [id, hostName, dateJoined, profilePic, hostDescription, reviewCount, isVerified, isSuperhost, listingID], { prepare: true }, (err, result) => {
        if (err) {
          console.log('Cannot add entries to cassandra', err);
        }
        else {
          console.log('added entries to cassandra', i);
        }
      });
      try {
        await new Promise(resolve => setImmediate(resolve));
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
};


writeTenMillionRecordsIntoCassandra();


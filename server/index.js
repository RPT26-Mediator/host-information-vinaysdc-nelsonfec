const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('../database/db.js');
const PORT = 3007;
const cors = require('cors');
const pool = require('../database/postgresDb.js');
const newrelic = require('newrelic');
const path = require('path');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));

app.get('/:listingID/host', (req, res) => {
  db.getHostInfo(req.params.listingID).then((host) => {
    res.send(host);
  }).catch((error) =>{
    console.log(error);
    res.end();
  });
});


//Get route
app.get('/hosts/:id', (req, res) => {
  let request = `
      SELECT * FROM hostinformation
      WHERE id = ${req.params.id}
  `;

  pool.query(request, (err, data) => {
    if (err) {
      throw err;
    }
    res.status(200).json(data.rows);
  });
});


//Post route
app.post('/addHosts', (req, res) => {

  const insert = 'INSERT INTO hostinformation (host_name, date_joined, profile_pic, host_description, review_COUNT, is_verified, is_superhost, listing_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8)';

  var params = req.body.data ? req.body.data : req.body;
  console.log(params);
  pool.query(insert, [params.host_name, params.date_joined, params.profile_pic, params.host_description, params.review_COUNT, params.is_verified, params.is_superhost, params.listing_id], (err, data) => {
    if (err) {
      throw err;
    }
    console.log('user added', data);
    res.status(200).send('Users added');
  });
});

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
});



app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

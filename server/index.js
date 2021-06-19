const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('../database/db.js');
const PORT = 3007;
const cors = require('cors');
const pool = require('../database/postgresDb.js');
const newrelic = require('newrelic');
const path = require('path');


const redis = require('redis');
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = redis.createClient(REDIS_PORT);

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



const connect = async () => {
    for (let nRetry = 1; ; nRetry++) {
        try {
            const client = await pool.connect();
            if (nRetry > 1) {
                console.info('Now successfully connected to Postgres');
            }
            return client;
        } catch (e) {
            if (e.toString().includes('ECONNREFUSED') && nRetry < 5) {
                console.info('ECONNREFUSED connecting to Postgres, ' +
                    'maybe container is not ready yet, will retry ' + nRetry);
                // Wait 1 second
                await new Promise(resolve => setTimeout(resolve, 1000));
            } else {
                throw e;
            }
        }
    }
}

const getNames = async(req, res) => {

  try {

    const id = req.params.id;

    let request = `
    SELECT * FROM hostinformation
    WHERE id = ${id}
  `;

  pool.query(request, (err, data) => {
    if (err) {
      throw err;
    }
    client.setex(id, 3600, data.rows[0].host_name);


    res.status(200).json(data.rows);
  });

  } catch(err) {
    throw err;
  }
}

function cache(req, res, next) {
  const id = req.params.id;

  client.get(id, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      res.status(200).json(data);
    } else {
      next();
    }
  })
}


//Get route
app.get('/hosts/:id', (req, res) => {
  console.log('here');
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

//redis

app.get('/redis/:id', cache, getNames);


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

// app.get('/loaderio-1179d0823c5df6f94db3168bcadaae0f', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../loaderio-1179d0823c5df6f94db3168bcadaae0f.txt'));
// });

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
});



app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

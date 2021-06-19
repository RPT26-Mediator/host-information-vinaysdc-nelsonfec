const Pool = require('pg').Pool;


const pool = new Pool({
  user: 'postgres',
  password: 'qwerty',
  host: '172.31.20.254',
  port: 5432,
  database: 'airbnb'
});


module.exports = pool;
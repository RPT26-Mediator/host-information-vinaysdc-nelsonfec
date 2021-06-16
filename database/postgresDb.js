const Pool = require('pg').Pool;


const pool = new Pool({
  user: 'postgres',
  password: 'qwerty',
  host: '3.141.7.35',
  port: 5432,
  database: 'airbnb'
});


module.exports = pool;
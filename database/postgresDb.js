const Pool = require('pg').Pool;


const pool = new Pool({
  user: 'postgres',
  password: 'qwerty',
  host: '18.222.116.184',
  port: 5432,
  database: 'airbnb'
});


module.exports = pool;
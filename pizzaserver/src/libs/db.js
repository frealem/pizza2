const { Pool } = require('pg');
require('dotenv').config();

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Connect to the database and log connection info
db.connect()
  .then(() => {
    console.log('Connected to the database successfully!');
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

module.exports = db;
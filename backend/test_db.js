const db = require('./config/db');

db.query('SELECT 1', (err, res) => {
  if (err) {
    console.log('DB Error:', err);
  } else {
    console.log('DB connected!');
  }
});

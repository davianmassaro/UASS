require('dotenv').config();
const app = require('./app'); // pakai app.js yang sudah mendaftarkan semua route
const db = require('./models');

db.sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('DB error:', err));

app.listen(3000, () => console.log('Server running on port 3000'));

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use('/uploads', express.static('uploads'));

const authRoutes = require('./routes/authRoutes');
const requestRoutes = require('./routes/requestRoutes');
const reportRoutes = require('./routes/reportRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/request', requestRoutes);
app.use('/api/report', reportRoutes);




app.listen(3000, () => {
  console.log('Server running on port 3000');
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

// Import routes
const cityRoutes = require('./routes/cityRoutes');
const flightRoutes = require('./routes/flightRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const adminRoutes = require('./routes/adminRoutes');
const emailRoutes = require('./routes/emailRoutes'); // YENİ EKLENEN


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/cities', cityRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/email', emailRoutes); 


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});





const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cities = require('./cities');
const City = require('../models/City');
const Admin = require('../models/Admin');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

const importData = async () => {
  try {
    // Clear existing data
    await City.deleteMany();
    
    // Import cities
    await City.insertMany(cities);
    
    // Create default admin
    await Admin.deleteMany();
    await Admin.create({
      username: 'admin',
      password: 'admin123'
    });
    
    console.log('Data imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await City.deleteMany();
    await Admin.deleteMany();
    
    console.log('Data destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Check command line argument to import or destroy data
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
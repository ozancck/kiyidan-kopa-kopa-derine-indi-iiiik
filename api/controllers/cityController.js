// controllers/cityController.js
const City = require('../models/City');
const citiesData = require('../data/cities'); // Import cities data

// @desc    Get all cities
// @route   GET /api/cities
// @access  Public
exports.getCities = async (req, res) => {
  try {
    const cities = await City.find({}).sort({ city_name: 1 });
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get city by ID
// @route   GET /api/cities/:id
// @access  Public
exports.getCityById = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    
    if (city) {
      res.json(city);
    } else {
      res.status(404).json({ message: 'City not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Seed cities into database
// @route   POST /api/cities/seed
// @access  Public
exports.seedCities = async (req, res) => {
  try {
    // Check if cities already exist
    const existingCities = await City.countDocuments();
    
    if (existingCities > 0) {
      return res.json({ 
        message: `Database already has ${existingCities} cities`,
        seeded: false 
      });
    }
    
    // Insert all cities from the data file
    const result = await City.insertMany(citiesData);
    
    res.status(201).json({
      message: `Successfully seeded ${result.length} cities`,
      seeded: true,
      count: result.length
    });
    
  } catch (error) {
    console.error('Seed cities error:', error);
    res.status(500).json({ message: error.message });
  }
};
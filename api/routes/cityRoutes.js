const express = require('express');
const { getCities, getCityById, seedCities } = require('../controllers/cityController');

const router = express.Router();

// GET /api/cities
router.get('/', getCities);

// POST /api/cities/seed - Seed cities into database
router.post('/seed', seedCities);

// GET /api/cities/:id
router.get('/:id', getCityById);

module.exports = router;
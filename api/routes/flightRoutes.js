const express = require('express');
const {
  getFlights,
  getFlightById,
  createFlight,
  updateFlight,
  deleteFlight,
  searchFlights
} = require('../controllers/flightController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getFlights);
router.post('/search', searchFlights);
router.get('/:id', getFlightById);
router.post('/', protect, createFlight);
router.put('/:id', protect, updateFlight);
router.delete('/:id', protect, deleteFlight);

module.exports = router;
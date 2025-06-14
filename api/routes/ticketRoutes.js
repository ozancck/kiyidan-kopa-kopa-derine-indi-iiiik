const express = require('express');
const {
  bookTicket,
  getTicketById,
  getTickets
} = require('../controllers/ticketController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', bookTicket);
router.get('/:id', getTicketById);
router.get('/', protect, getTickets);

module.exports = router;
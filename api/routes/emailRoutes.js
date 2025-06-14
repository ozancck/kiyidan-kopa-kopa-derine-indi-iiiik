// routes/emailRoutes.js
const express = require('express');
const router = express.Router();
const { sendTicketEmail } = require('../services/emailService');
const Ticket = require('../models/Ticket');

// @desc    Send e-ticket via email
// @route   POST /api/email/send-ticket/:ticketId
// @access  Public
router.post('/send-ticket/:ticketId', async (req, res) => {
  try {
    const { ticketId } = req.params;
    
    // Ticket'ı veritabanından getir (populate ile)
    const ticket = await Ticket.findById(ticketId)
      .populate({
        path: 'flight_id',
        populate: [
          { path: 'from_city', select: 'city_name' },
          { path: 'to_city', select: 'city_name' }
        ]
      });
    
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found'
      });
    }
    
    // Email gönder
    const emailResult = await sendTicketEmail(ticket);
    
    if (emailResult.success) {
      res.json({
        success: true,
        message: 'E-ticket sent successfully!',
        messageId: emailResult.messageId
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send email',
        error: emailResult.error
      });
    }
    
  } catch (error) {
    console.error('Send email error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;

// app.js'e ekleyin:
// const emailRoutes = require('./routes/emailRoutes');
// app.use('/api/email', emailRoutes);
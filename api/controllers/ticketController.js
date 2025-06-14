const Ticket = require('../models/Ticket');
const Flight = require('../models/Flight');
const { v4: uuidv4 } = require('uuid');

// @desc    Book a ticket
// @route   POST /api/tickets
// @access  Public
exports.bookTicket = async (req, res) => {
  try {
    const {
      passenger_name,
      passenger_surname,
      passenger_email,
      flight_id,
      seat_number
    } = req.body;
    
    // Check if flight exists and has available seats
    const flight = await Flight.findById(flight_id);
    
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    
    if (flight.seats_available <= 0) {
      return res.status(400).json({ message: 'No seats available for this flight' });
    }
    
    // Generate ticket ID
    const ticket_id = `TKT-${uuidv4().substring(0, 8).toUpperCase()}`;
    
    // Create ticket
    const ticket = new Ticket({
      ticket_id,
      passenger_name,
      passenger_surname,
      passenger_email,
      flight_id,
      seat_number: seat_number || `${Math.floor(Math.random() * flight.seats_total) + 1}A`
    });
    
    // Update flight available seats
    flight.seats_available -= 1;
    await flight.save();
    
    const createdTicket = await ticket.save();
    
    res.status(201).json(createdTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get ticket by ID
// @route   GET /api/tickets/:id
// @access  Public
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate({
      path: 'flight_id',
      populate: [
        { path: 'from_city', select: 'city_name' },
        { path: 'to_city', select: 'city_name' }
      ]
    });
    
    if (ticket) {
      res.json(ticket);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all tickets
// @route   GET /api/tickets
// @access  Private/Admin
exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({}).populate({
      path: 'flight_id',
      populate: [
        { path: 'from_city', select: 'city_name' },
        { path: 'to_city', select: 'city_name' }
      ]
    }).sort({ booking_date: -1 });
    
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
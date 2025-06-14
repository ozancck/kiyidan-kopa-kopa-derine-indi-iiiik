const Flight = require('../models/Flight');
const City = require('../models/City');

// @desc    Get all flights
// @route   GET /api/flights
// @access  Public
exports.getFlights = async (req, res) => {
  try {
    const flights = await Flight.find({})
      .populate('from_city', 'city_name')
      .populate('to_city', 'city_name')
      .sort({ departure_time: 1 });
    
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get flight by ID
// @route   GET /api/flights/:id
// @access  Public
exports.getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id)
      .populate('from_city', 'city_name')
      .populate('to_city', 'city_name');
    
    if (flight) {
      res.json(flight);
    } else {
      res.status(404).json({ message: 'Flight not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a flight
// @route   POST /api/flights
// @access  Private/Admin
exports.createFlight = async (req, res) => {
  try {
    const {
      flight_id,
      from_city,
      to_city,
      departure_time,
      arrival_time,
      price,
      seats_total
    } = req.body;
    
    const flight = new Flight({
      flight_id,
      from_city,
      to_city,
      departure_time,
      arrival_time,
      price,
      seats_total,
      seats_available: seats_total
    });
    
    const createdFlight = await flight.save();
    res.status(201).json(createdFlight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a flight
// @route   PUT /api/flights/:id
// @access  Private/Admin
exports.updateFlight = async (req, res) => {
  try {
    const {
      flight_id,
      from_city,
      to_city,
      departure_time,
      arrival_time,
      price,
      seats_total,
      seats_available
    } = req.body;
    
    const flight = await Flight.findById(req.params.id);
    
    if (flight) {
      flight.flight_id = flight_id || flight.flight_id;
      flight.from_city = from_city || flight.from_city;
      flight.to_city = to_city || flight.to_city;
      flight.departure_time = departure_time || flight.departure_time;
      flight.arrival_time = arrival_time || flight.arrival_time;
      flight.price = price || flight.price;
      flight.seats_total = seats_total || flight.seats_total;
      flight.seats_available = seats_available !== undefined ? seats_available : flight.seats_available;
      
      const updatedFlight = await flight.save();
      res.json(updatedFlight);
    } else {
      res.status(404).json({ message: 'Flight not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a flight
// @route   DELETE /api/flights/:id
// @access  Private/Admin
exports.deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    
    if (flight) {
      await flight.remove();
      res.json({ message: 'Flight removed' });
    } else {
      res.status(404).json({ message: 'Flight not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message , flight});
  }
};

// @desc    Search flights
// @route   POST /api/flights/search
// @access  Public
exports.searchFlights = async (req, res) => {
  try {
    console.log('Search request body:', req.body); // Debug log
    
    const { from_city, to_city, date } = req.body;
    
    // Validate required fields
    if (!from_city || !to_city || !date) {
      return res.status(400).json({ 
        message: 'Missing required fields: from_city, to_city, date' 
      });
    }
    
    // Create date range for the search (whole day)
    const searchDate = new Date(date);
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    
    console.log('Date range:', { searchDate, nextDay }); // Debug log
    
    // Build the base query
    const query = {
      departure_time: {
        $gte: searchDate,
        $lt: nextDay
      },
      seats_available: { $gt: 0 }
    };
    
    // Handle city search - can be either ObjectId or city name
    if (from_city) {
      // Check if from_city is a valid ObjectId
      if (from_city.match(/^[0-9a-fA-F]{24}$/)) {
        // It's an ObjectId
        query.from_city = from_city;
      } else {
        // It's a city name, find the city first
        const fromCityDoc = await City.findOne({ 
          $or: [
            { city_name: from_city },
            { city_name: { $regex: new RegExp(from_city, 'i') } } // Case insensitive
          ]
        });
        
        if (!fromCityDoc) {
          return res.status(404).json({ 
            message: `Departure city '${from_city}' not found` 
          });
        }
        
        query.from_city = fromCityDoc._id;
      }
    }
    
    if (to_city) {
      // Check if to_city is a valid ObjectId
      if (to_city.match(/^[0-9a-fA-F]{24}$/)) {
        // It's an ObjectId
        query.to_city = to_city;
      } else {
        // It's a city name, find the city first
        const toCityDoc = await City.findOne({ 
          $or: [
            { city_name: to_city },
            { city_name: { $regex: new RegExp(to_city, 'i') } } // Case insensitive
          ]
        });
        
        if (!toCityDoc) {
          return res.status(404).json({ 
            message: `Arrival city '${to_city}' not found` 
          });
        }
        
        query.to_city = toCityDoc._id;
      }
    }
    
    console.log('Final query:', query); // Debug log
    
    const flights = await Flight.find(query)
      .populate('from_city', 'city_name')
      .populate('to_city', 'city_name')
      .sort({ departure_time: 1 });
    
    console.log('Found flights:', flights.length); // Debug log
    
    res.json(flights); // Direkt array döndür

    
  } catch (error) {
    console.error('Flight search error:', error); // Debug log
    res.status(500).json({ 
      message: 'Server error during flight search',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};
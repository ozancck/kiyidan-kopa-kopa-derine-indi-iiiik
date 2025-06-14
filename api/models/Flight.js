const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flight_id: {
    type: String,
    required: true,
    unique: true
  },
  from_city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true
  },
  to_city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true
  },
  departure_time: {
    type: Date,
    required: true
  },
  arrival_time: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  seats_total: {
    type: Number,
    required: true
  },
  seats_available: {
    type: Number,
    required: true
  }
});

// Middleware to check flight scheduling rules
flightSchema.pre('save', async function(next) {
  const Flight = this.constructor;
  
  // Check if there's already a flight departing from the same city at the same hour
  const departureHour = new Date(this.departure_time);
  departureHour.setMinutes(0, 0, 0);
  const nextHour = new Date(departureHour);
  nextHour.setHours(departureHour.getHours() + 1);
  
  const conflictingDeparture = await Flight.findOne({
    from_city: this.from_city,
    departure_time: {
      $gte: departureHour,
      $lt: nextHour
    },
    _id: { $ne: this._id } // Exclude current flight if updating
  });
  
  if (conflictingDeparture) {
    return next(new Error(`A flight from this city already departs at the same hour (${departureHour.getHours()}:00)`));
  }
  
  // Check if there's already a flight arriving at the same city at the same time
  const arrivalHour = new Date(this.arrival_time);
  arrivalHour.setMinutes(0, 0, 0);
  const nextArrivalHour = new Date(arrivalHour);
  nextArrivalHour.setHours(arrivalHour.getHours() + 1);
  
  const conflictingArrival = await Flight.findOne({
    to_city: this.to_city,
    arrival_time: {
      $gte: arrivalHour,
      $lt: nextArrivalHour
    },
    _id: { $ne: this._id } // Exclude current flight if updating
  });
  
  if (conflictingArrival) {
    return next(new Error(`A flight to this city already arrives at the same hour (${arrivalHour.getHours()}:00)`));
  }
  
  next();
});

module.exports = mongoose.model('Flight', flightSchema);
// services/emailService.js
const nodemailer = require('nodemailer');

// Email transporter (Gmail kullanıyoruz, değiştirilebilir)
const createTransport = () => {
  return nodemailer.createTransport({
    service: 'gmail', // veya başka bir email service
    auth: {
      user: process.env.EMAIL_USER, // Gmail adresiniz
      pass: process.env.EMAIL_PASS  // Gmail app password
    }
  });
};

// E-ticket HTML template
const generateTicketHTML = (ticket) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
        .ticket { background: white; border-radius: 10px; padding: 30px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { text-align: center; background: #007bff; color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; }
        .info-row { display: flex; justify-content: space-between; margin: 15px 0; padding: 10px; background: #f8f9fa; border-radius: 5px; }
        .label { font-weight: bold; color: #333; }
        .value { color: #666; }
        .flight-details { background: #e3f2fd; padding: 20px; border-radius: 10px; margin: 20px 0; }
        .important { background: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ffc107; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 10px; }
      </style>
    </head>
    <body>
      <div class="ticket">
        <div class="header">
          <h1>✈️ E-Ticket Confirmation</h1>
          <p>Your flight has been successfully booked!</p>
        </div>
        
        <div class="info-row">
          <span class="label">Ticket ID:</span>
          <span class="value">${ticket.ticket_id}</span>
        </div>
        
        <div class="info-row">
          <span class="label">Passenger:</span>
          <span class="value">${ticket.passenger_name} ${ticket.passenger_surname}</span>
        </div>
        
        <div class="info-row">
          <span class="label">Seat Number:</span>
          <span class="value"><strong>${ticket.seat_number || 'Not assigned'}</strong></span>
        </div>
        
        <div class="flight-details">
          <h3>🛫 Flight Details</h3>
          <div class="info-row">
            <span class="label">Flight Number:</span>
            <span class="value">${ticket.flight_id.flight_id}</span>
          </div>
          <div class="info-row">
            <span class="label">Route:</span>
            <span class="value">${ticket.flight_id.from_city.city_name} → ${ticket.flight_id.to_city.city_name}</span>
          </div>
          <div class="info-row">
            <span class="label">Departure:</span>
            <span class="value">${new Date(ticket.flight_id.departure_time).toLocaleString()}</span>
          </div>
          <div class="info-row">
            <span class="label">Arrival:</span>
            <span class="value">${new Date(ticket.flight_id.arrival_time).toLocaleString()}</span>
          </div>
          <div class="info-row">
            <span class="label">Price:</span>
            <span class="value"><strong>${ticket.flight_id.price} ₺</strong></span>
          </div>
        </div>
        
        <div class="important">
          <strong>⚠️ Important:</strong> Please arrive at the airport at least 2 hours before domestic flights and 3 hours before international flights.
        </div>
        
        <div class="footer">
          <p>Thank you for choosing our airline!</p>
          <p><small>Booking Date: ${new Date(ticket.booking_date).toLocaleString()}</small></p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Email gönderme fonksiyonu
const sendTicketEmail = async (ticket) => {
  try {
    const transporter = createTransport();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: ticket.passenger_email,
      subject: `✈️ E-Ticket Confirmation - ${ticket.flight_id.flight_id} | ${ticket.ticket_id}`,
      html: generateTicketHTML(ticket),
      // Text alternatifi
      text: `
        E-Ticket Confirmation
        
        Ticket ID: ${ticket.ticket_id}
        Passenger: ${ticket.passenger_name} ${ticket.passenger_surname}
        Seat: ${ticket.seat_number || 'Not assigned'}
        
        Flight: ${ticket.flight_id.flight_id}
        From: ${ticket.flight_id.from_city.city_name}
        To: ${ticket.flight_id.to_city.city_name}
        Departure: ${new Date(ticket.flight_id.departure_time).toLocaleString()}
        Price: ${ticket.flight_id.price} ₺
        
        Thank you for choosing our airline!
      `
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendTicketEmail
};


// services/emailService.js
const sendTicketEmail = async (ticketId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/email/send-ticket/${ticketId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send email');
      }
      
      return data;
    } catch (error) {
      console.error('Email service error:', error);
      throw error;
    }
  };
  
  // Default export
  export default { sendTicketEmail };
  
  // Named export da ekleyelim
  export { sendTicketEmail };
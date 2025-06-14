export const formatDateTime = (dateString) => {
    const options = { 
      hour: 'numeric', 
      minute: 'numeric',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour12: false
    };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
  };
  
  export const formatTime = (dateString) => {
    const options = { 
      hour: 'numeric', 
      minute: 'numeric',
      hour12: false
    };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
  };
  
  export const formatDate = (dateString) => {
    const options = { 
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
  };
  
  export const calculateFlightDuration = (departure, arrival) => {
    const dep = new Date(departure);
    const arr = new Date(arrival);
    const diff = arr - dep;
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };
  
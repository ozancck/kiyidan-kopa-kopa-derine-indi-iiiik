import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Badge } from 'react-bootstrap';

const SimpleSeatSelection = ({ flight, selectedSeats, onSeatSelection }) => {
  const [seats, setSeats] = useState([]);
  
  // Generate seat layout (assuming 6 seats per row, A-F)
  useEffect(() => {
    if (flight) {
      generateSeats();
    }
  }, [flight]);

  const generateSeats = () => {
    const totalSeats = 30; // 5 rows of 6 seats
    const seatLayout = [];
    const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
    
    // Generate occupied seats (random for demo)
    const occupiedSeats = [];
    const occupiedCount = Math.floor(totalSeats - flight.seats_available);
    
    while (occupiedSeats.length < occupiedCount) {
      const randomRow = Math.floor(Math.random() * 5) + 1;
      const randomLetter = seatLetters[Math.floor(Math.random() * 6)];
      const seatNumber = `${randomRow}${randomLetter}`;
      
      if (!occupiedSeats.includes(seatNumber)) {
        occupiedSeats.push(seatNumber);
      }
    }

    // Create seat objects
    for (let row = 1; row <= 5; row++) {
      for (let letter of seatLetters) {
        const seatNumber = `${row}${letter}`;
        seatLayout.push({
          number: seatNumber,
          row: row,
          letter: letter,
          isOccupied: occupiedSeats.includes(seatNumber),
          type: letter === 'A' || letter === 'F' ? 'window' : letter === 'C' || letter === 'D' ? 'aisle' : 'middle'
        });
      }
    }
    
    setSeats(seatLayout);
  };

  const handleSeatClick = (seatNumber) => {
    const seat = seats.find(s => s.number === seatNumber);
    
    if (seat.isOccupied) return;
    
    let newSelection = [...selectedSeats];
    
    if (selectedSeats.includes(seatNumber)) {
      // Remove seat
      newSelection = newSelection.filter(s => s !== seatNumber);
    } else {
      // Add seat (limit to 8 passengers max)
      if (newSelection.length < 8) {
        newSelection.push(seatNumber);
      }
    }
    
    onSeatSelection(newSelection);
  };

  const getSeatClass = (seat) => {
    let className = 'seat-btn ';
    
    if (seat.isOccupied) {
      className += 'seat-occupied';
    } else if (selectedSeats.includes(seat.number)) {
      className += 'seat-selected';
    } else {
      className += `seat-available seat-${seat.type}`;
    }
    
    return className;
  };

  const getSeatIcon = (seat) => {
    if (seat.isOccupied) {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
        </svg>
      );
    } else if (selectedSeats.includes(seat.number)) {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/>
        </svg>
      );
    } else {
      return seat.number;
    }
  };

  // Group seats by row
  const seatRows = [];
  for (let row = 1; row <= 5; row++) {
    seatRows.push(seats.filter(seat => seat.row === row));
  }

  return (
    <div className="seat-selection-container">
      {/* Legend */}
      <div className="seat-legend">
        <div className="legend-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
          </svg>
          <span>Koltuk Durumu</span>
        </div>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-seat seat-available"></div>
            <span>Müsait</span>
          </div>
          <div className="legend-item">
            <div className="legend-seat seat-selected"></div>
            <span>Seçili</span>
          </div>
          <div className="legend-item">
            <div className="legend-seat seat-occupied"></div>
            <span>Dolu</span>
          </div>
        </div>
      </div>

      {/* Airplane Layout */}
      <div className="airplane-container">
        {/* Airplane Nose */}
        <div className="airplane-nose">
          <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 5L50 35H10L30 5Z" fill="var(--primary-200)" stroke="var(--primary-400)" strokeWidth="2"/>
          </svg>
        </div>

        {/* Seat Map */}
        <div className="seat-map">
          {seatRows.map((row, rowIndex) => (
            <div key={rowIndex + 1} className="seat-row">
              <div className="row-number">
                <span>{rowIndex + 1}</span>
              </div>
              
              <div className="seats-container">
                {/* Left side (A, B, C) */}
                <div className="seat-group left-group">
                  {row.slice(0, 3).map(seat => (
                    <button
                      key={seat.number}
                      className={getSeatClass(seat)}
                      onClick={() => handleSeatClick(seat.number)}
                      disabled={seat.isOccupied}
                      title={`Koltuk ${seat.number} - ${seat.type === 'window' ? 'Pencere' : seat.type === 'aisle' ? 'Koridor' : 'Orta'}`}
                    >
                      {getSeatIcon(seat)}
                    </button>
                  ))}
                </div>

                {/* Aisle */}
                <div className="aisle">
                  <div className="aisle-line"></div>
                </div>

                {/* Right side (D, E, F) */}
                <div className="seat-group right-group">
                  {row.slice(3, 6).map(seat => (
                    <button
                      key={seat.number}
                      className={getSeatClass(seat)}
                      onClick={() => handleSeatClick(seat.number)}
                      disabled={seat.isOccupied}
                      title={`Koltuk ${seat.number} - ${seat.type === 'window' ? 'Pencere' : seat.type === 'aisle' ? 'Koridor' : 'Orta'}`}
                    >
                      {getSeatIcon(seat)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="row-number">
                <span>{rowIndex + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Airplane Tail */}
        <div className="airplane-tail">
          <div className="tail-section"></div>
        </div>
      </div>

      {/* Selection Summary */}
      {selectedSeats.length > 0 && (
        <div className="selection-summary">
          <div className="summary-header">
            <h5>Seçilen Koltuklar</h5>
            <Badge bg="primary">{selectedSeats.length} koltuk</Badge>
          </div>
          <div className="selected-seats">
            {selectedSeats.map(seatNumber => {
              const seat = seats.find(s => s.number === seatNumber);
              return (
                <div key={seatNumber} className="selected-seat-item">
                  <span className="seat-number">{seatNumber}</span>
                  <span className="seat-type">
                    {seat?.type === 'window' ? '🪟 Pencere' : 
                     seat?.type === 'aisle' ? '🚶 Koridor' : 
                     '⬅️➡️ Orta'}
                  </span>
                  <button 
                    className="remove-seat-btn"
                    onClick={() => handleSeatClick(seatNumber)}
                    title="Koltuk seçimini kaldır"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <style jsx>{`
        .seat-selection-container {
          max-width: 600px;
          margin: 0 auto;
        }

        /* Legend */
        .seat-legend {
          background: rgba(99, 102, 241, 0.05);
          border-radius: var(--radius-lg);
          padding: var(--space-4);
          margin-bottom: var(--space-6);
          border: 1px solid rgba(99, 102, 241, 0.1);
        }

        .legend-title {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-semibold);
          color: var(--gray-800);
          margin-bottom: var(--space-3);
        }

        .legend-items {
          display: flex;
          gap: var(--space-6);
          flex-wrap: wrap;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--font-size-sm);
          color: var(--gray-700);
        }

        .legend-seat {
          width: 20px;
          height: 20px;
          border-radius: var(--radius-sm);
          border: 2px solid;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Airplane Container */
        .airplane-container {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.9));
          border: 2px solid rgba(99, 102, 241, 0.2);
          border-radius: var(--radius-2xl);
          padding: var(--space-6);
          box-shadow: var(--shadow-lg);
          margin-bottom: var(--space-6);
        }

        .airplane-nose {
          text-align: center;
          margin-bottom: var(--space-4);
        }

        .airplane-tail {
          margin-top: var(--space-4);
          text-align: center;
        }

        .tail-section {
          width: 60px;
          height: 20px;
          background: var(--primary-200);
          border: 2px solid var(--primary-400);
          border-radius: 0 0 var(--radius-xl) var(--radius-xl);
          margin: 0 auto;
        }

        /* Seat Map */
        .seat-map {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .seat-row {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }

        .row-number {
          width: 30px;
          text-align: center;
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-bold);
          color: var(--gray-600);
          background: rgba(99, 102, 241, 0.1);
          border-radius: var(--radius-md);
          padding: var(--space-2);
        }

        .seats-container {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          flex: 1;
          justify-content: center;
        }

        .seat-group {
          display: flex;
          gap: var(--space-2);
        }

        .aisle {
          width: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .aisle-line {
          width: 2px;
          height: 30px;
          background: var(--gray-300);
          border-radius: 1px;
        }

        /* Seat Buttons */
        .seat-btn {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          border: 2px solid;
          background: white;
          cursor: pointer;
          transition: var(--transition-normal);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .seat-available {
          border-color: var(--gray-300);
          color: var(--gray-700);
          background: white;
        }

        .seat-available:hover {
          border-color: var(--primary-400);
          background: var(--primary-50);
          color: var(--primary-700);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .seat-window {
          border-color: var(--success-400);
        }

        .seat-window:hover {
          border-color: var(--success-500);
          background: var(--success-50);
          color: var(--success-700);
        }

        .seat-aisle {
          border-color: var(--warning-400);
        }

        .seat-aisle:hover {
          border-color: var(--warning-500);
          background: var(--warning-50);
          color: var(--warning-700);
        }

        .seat-selected {
          border-color: var(--primary-500);
          background: var(--primary-500);
          color: white;
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .seat-selected:hover {
          border-color: var(--primary-600);
          background: var(--primary-600);
          color: white;
        }

        .seat-occupied {
          border-color: var(--error-400);
          background: var(--error-100);
          color: var(--error-600);
          cursor: not-allowed;
          opacity: 0.7;
        }

        .seat-occupied:disabled {
          transform: none;
          box-shadow: none;
        }

        /* Selection Summary */
        .selection-summary {
          background: rgba(99, 102, 241, 0.05);
          border: 1px solid rgba(99, 102, 241, 0.1);
          border-radius: var(--radius-lg);
          padding: var(--space-6);
        }

        .summary-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-4);
        }

        .summary-header h5 {
          margin: 0;
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          color: var(--gray-900);
        }

        .selected-seats {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
        }

        .selected-seat-item {
          background: white;
          border: 1px solid var(--primary-200);
          border-radius: var(--radius-lg);
          padding: var(--space-3);
          display: flex;
          align-items: center;
          gap: var(--space-3);
          min-width: 140px;
        }

        .seat-number {
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-bold);
          color: var(--primary-700);
          background: var(--primary-100);
          border-radius: var(--radius-md);
          padding: var(--space-1) var(--space-2);
        }

        .seat-type {
          font-size: var(--font-size-xs);
          color: var(--gray-600);
          flex: 1;
        }

        .remove-seat-btn {
          background: var(--error-100);
          border: 1px solid var(--error-200);
          border-radius: var(--radius-md);
          padding: var(--space-1);
          color: var(--error-600);
          cursor: pointer;
          transition: var(--transition-normal);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .remove-seat-btn:hover {
          background: var(--error-200);
          color: var(--error-700);
        }

        /* Mobile Responsive */
        @media (max-width: 767.98px) {
          .airplane-container {
            padding: var(--space-4);
          }

          .seat-btn {
            width: 35px;
            height: 35px;
            font-size: 10px;
          }

          .seats-container {
            gap: var(--space-2);
          }

          .seat-group {
            gap: var(--space-1);
          }

          .aisle {
            width: 30px;
          }

          .legend-items {
            gap: var(--space-4);
          }

          .selected-seats {
            flex-direction: column;
          }

          .selected-seat-item {
            min-width: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default SimpleSeatSelection;

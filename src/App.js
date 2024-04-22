import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState('');

  const handleTrack = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/shipments?trackingNumber=${trackingNumber}`);
      if (response.data.length > 0) {
        setShipment(response.data[0]);
        setError('');
      } else {
        setShipment(null);
        setError('Shipment not found');
      }
    } catch (error) {
      console.error('Error tracking shipment:', error);
      setError('Error tracking shipment');
    }
  };

  return (
    <div>
      <h1>Courier Tracking</h1>
      <input
        type="text"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
      />
      <button onClick={handleTrack}>Track</button>
      {error && <p>{error}</p>}
      {shipment && (
        <div>
          <h2>Shipment Information</h2>
          <p>Tracking Number: {shipment.trackingNumber}</p>
          <p>Status: {shipment.status}</p>
        </div>
      )}
    </div>
  );
};

export default App;

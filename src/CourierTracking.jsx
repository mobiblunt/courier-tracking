import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CourierTracking() {
  const [couriers, setCouriers] = useState([]);
  const [selectedCourier, setSelectedCourier] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/couriers')
      .then(response => {
        setCouriers(response.data);
      });
  }, []);

  const handleSelectCourier = (id) => {
    setSelectedCourier(couriers.find(courier => courier.id === id));
  };

  return (
    <div>
      <h1>Courier Tracking</h1>
      <ul>
        {couriers.map(courier => (
          <li key={courier.id}>
            <a href="#" onClick={() => handleSelectCourier(courier.id)}>
              {courier.name} ({courier.status})
            </a>
          </li>
        ))}
      </ul>
      {selectedCourier && (
        <div>
          <h2>{selectedCourier.name}</h2>
          <p>Status: {selectedCourier.status}</p>
        </div>
      )}
    </div>
  );
}

export default CourierTracking;
// frontend/src/components/Tacos.js

import React from 'react';

function Tacos({ tacos }) {
  return (
    <div className="section">
      <h2>Tacos</h2>
      <ul>
        {tacos.map((taco, index) => (
          <li key={index}>{taco.name}</li>
          // Adjust based on actual data structure from API
        ))}
      </ul>
    </div>
  );
}

export default Tacos;

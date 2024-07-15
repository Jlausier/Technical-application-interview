// frontend/src/components/Meals.js

import React from 'react';

function Meals({ meals }) {
  return (
    <div className="section">
      <h2>Meals</h2>
      <ul>
        {meals.map((meal, index) => (
          <li key={index}>{meal.name}</li>
          // Adjust based on actual data structure from API
        ))}
      </ul>
    </div>
  );
}

export default Meals;

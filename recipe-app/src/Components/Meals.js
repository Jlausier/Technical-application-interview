// frontend/src/components/Meals.js

import React from 'react';

function Meals({ meals }) {
  return (
    <div className="section">
      <h2>Meals in City</h2>
      <ul>
        {meals.map((meal, index) => (
          <li key={index}>
            <p><strong>Name:</strong> {meal.name}</p>
            <p><strong>Address:</strong> {meal.address}</p>
            <p><strong>Type:</strong> {meal.type}</p>
            <p><strong>Is Open:</strong> {meal.is_open ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Meals;
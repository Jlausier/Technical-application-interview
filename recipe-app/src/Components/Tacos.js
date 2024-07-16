// frontend/src/components/Tacos.js

import React from 'react';

function Tacos({ tacos, onRandomClick }) {
  return (
    <div className="section">
      <h2>Random Tacos</h2>
      <button onClick={onRandomClick}>Get Random Tacos</button>
      <ul>
        {tacos.map((taco, index) => (
          <li key={index}>
            <h3>Taco {index + 1}</h3>
            <p><strong>Base Layer:</strong> {taco.base_layer}</p>
            <p><strong>Mixin:</strong> {taco.mixin}</p>
            <p><strong>Condiment:</strong> {taco.condiment}</p>
            <p><strong>Seasoning:</strong> {taco.seasoning}</p>
            <p><strong>Shell:</strong> {taco.shell}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tacos;
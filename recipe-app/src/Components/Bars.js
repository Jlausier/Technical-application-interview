import React from 'react';

const Bars = ({ bars }) => {
  return (
    <div>
      <h3>Nearby Bars</h3>
      <ul>
        {bars.map((bar) => (
          <li key={bar.place_id}>
            <h5>{bar.name}</h5>
            <p>{bar.vicinity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bars;
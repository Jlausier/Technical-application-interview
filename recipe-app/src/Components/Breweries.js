import React from 'react';

function Breweries({ breweries = [] }) {
  return (
    <div>
      <h3>Nearby Breweries</h3>
      <ul>
        {breweries.map((brewery) => (
          <li key={brewery.id}>
            <strong>{brewery.name}</strong><br />
            {brewery.street}<br />
            {brewery.city}, {brewery.state}<br />
            {brewery.phone && <span>Phone: {brewery.phone}</span>}<br />
            {brewery.website_url && <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">Website</a>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Breweries;
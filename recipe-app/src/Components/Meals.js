import React from 'react';

const Meals = ({ meals }) => {
  if (!meals || meals.length === 0) {
    return <div>No places found</div>;
  }

  return (
    <div>
      <h3>Restaurants and Bars</h3>
      <ul className="list-group">
        {meals.map((meal, index) => (
          <li key={index} className="list-group-item">
            <h5>{meal.name}</h5>
            <p>{meal.location.formatted_address}</p>
            <p>Category: {meal.categories[0]?.name}</p>
            <p>Distance: {meal.distance} meters</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Meals;
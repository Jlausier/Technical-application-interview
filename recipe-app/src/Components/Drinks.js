import React from 'react';

const Drinks = ({ drinks }) => {
  return (
    <div>
      {drinks.map((drink, index) => (
        <div key={index} className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{drink.strDrink}</h5>
            <p className="card-text">{drink.strInstructions}</p>
            <div className="ingredients">
              <h6>Ingredients:</h6>
              <ul>
                {getIngredients(drink).map((ingredient, i) => (
                  <li key={i}>
                    <img
                      src={`https://www.thecocktaildb.com/images/ingredients/${ingredient}-Medium.png`}
                      alt={ingredient}
                      style={{ maxWidth: '50px', marginRight: '10px' }}
                    />
                    {drink[`strMeasure${i + 1}`]} {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            <img
              src={drink.strDrinkThumb}
              alt={drink.strDrink}
              className="img-fluid rounded"
              style={{ maxWidth: '200px' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

function getIngredients(drink) {
  let ingredients = [];
  for (let i = 1; i <= 15; i++) {
    let ingredient = drink[`strIngredient${i}`];
    if (ingredient) {
      ingredients.push(ingredient);
    } else {
      break;
    }
  }
  return ingredients;
}

export default Drinks;
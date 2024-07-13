
import React from 'react';

const RecipeDisplay = ({ recipe }) => {
    return (
        <div className="recipe">
            <h2>{recipe.title}</h2>
            <p>{recipe.summary}</p>
            <h3>Ingredients:</h3>
            <ul className="list-group mb-3">
                {recipe.extendedIngredients.map((ingredient, index) => (
                    <li key={index} className="list-group-item">{ingredient.original}</li>
                ))}
            </ul>
            <h3>Instructions:</h3>
            <p className="card-text" dangerouslySetInnerHTML={{ __html: recipe.instructions }}></p>
        </div>
    );
};

export default RecipeDisplay;
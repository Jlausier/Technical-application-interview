import React from 'react';

const RecipeDisplay = ({ recipe }) => {
    if (!recipe) {
        return <div>Loading...</div>;  // Handle loading state if recipe data is not yet available
    }

    const { title, summary, extendedIngredients, instructions } = recipe;

    return (
        <div className="recipe">
            <h2>{title}</h2>
            <p>{summary}</p>
            
            <div className="ingredients">
                <h3>Ingredients:</h3>
                <ul className="list-group mb-3">
                    {extendedIngredients.map((ingredient, index) => (
                        <li key={index} className="list-group-item">{ingredient.original}</li>
                    ))}
                </ul>
            </div>

            <div className="instructions">
                <h3>Instructions:</h3>
                <div className="card-text" dangerouslySetInnerHTML={{ __html: instructions }}></div>
            </div>
        </div>
    );
};

export default RecipeDisplay;

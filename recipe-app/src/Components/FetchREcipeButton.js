import React from 'react';
import axios from 'axios';

const FetchRecipeButton = ({ setRecipe }) => {
    const fetchRecipe = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/spoonacular-random/');
            setRecipe(response.data.recipes[0]); // Assuming API response has recipes array
        } catch (error) {
            console.error('Error fetching recipe:', error);
        }
    };

    return (
        <div className="fetch-button mb-3">
            <button className="btn btn-primary" onClick={fetchRecipe}>Fetch Random Recipe</button>
        </div>
    );
};

export default FetchRecipeButton;
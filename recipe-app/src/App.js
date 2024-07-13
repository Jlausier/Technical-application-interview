import React, { useState } from 'react';
import './App.css';
import RecipeDisplay from './Components/RecipeDisplay';
import FetchRecipeButton from './Components/FetchREcipeButton';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [recipe, setRecipe] = useState(null);

  return (
      <div className="container mt-5">
          <div className="row justify-content-center">
              <div className="col-md-8">
                  <div className="card">
                      <div className="card-header">
                          <h1 className="text-center">Random Recipe Generator</h1>
                      </div>
                      <div className="card-body">
                          <FetchRecipeButton setRecipe={setRecipe} />
                          {recipe && <RecipeDisplay recipe={recipe} />}
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default App;
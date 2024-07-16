import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './src/Components/Header';
import Tacos from './src/Components/Tacos';
import Meals from './src/Components/Meals';
import Footer from './src/Components/Footer';
import axios from 'axios';
import tacoImage from './Images/taco.jpg';

function App() {
  const [tacos, setTacos] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');
  const [showCityInput, setShowCityInput] = useState(false);

  useEffect(() => {
    fetchRandomTacos();
  }, []);

  const fetchRandomTacos = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://taco-randomizer.herokuapp.com/random/?full-taco=true');
      setTacos([response.data]);
      setShowCityInput(true); // Show city input after first taco is fetched
    } catch (error) {
      console.error('Error fetching tacos:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMealsByCity = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/search_meals/?city=${city}`);
      setMeals(response.data);
    } catch (error) {
      console.error('Error searching meals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCitySearch = async (e) => {
    e.preventDefault();
    fetchMealsByCity();
  };

  return (
    <div className="App">
      <Header />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <img src={tacoImage} alt="Taco" className="img-fluid rounded mb-4" />
          </div>
          <div className="col-md-6">
            <h2 className="mb-4">Welcome to Taco al azar!</h2>
            <p className="lead">
              Explore our delicious selection of tacos. Click below to get a random taco recipe!
            </p>
            <button className="btn btn-primary mr-2" onClick={fetchRandomTacos}>Get Random Taco</button>
          </div>
        </div>
        <hr className="my-4" />
        {loading ? (
          <div className="text-center my-5">
            <h4>Loading...</h4>
          </div>
        ) : (
          <>
            <div className="row">
              <div className="col-md-6">
                <Tacos tacos={tacos} onRandomClick={fetchRandomTacos} />
              </div>
              <div className="col-md-6">
                {showCityInput && (
                  <form onSubmit={handleCitySearch}>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter city..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                      <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="submit">Search Restaurants</button>
                      </div>
                    </div>
                  </form>
                )}
                <Meals meals={meals} />
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;

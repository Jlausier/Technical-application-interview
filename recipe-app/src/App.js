import React, { useState, useEffect } from 'react';
import './App.css';
import Drinks from './Components/Drinks'; 
import Bars from './Components/Bars'; // Rename to Bars for clarity
import Footer from './Components/Footer';
import axios from 'axios';
import drinkImage from './Images/cocktails.jpg'; // Update path to drink image

function App() {
  const [drinks, setDrinks] = useState([]);
  const [bars, setBars] = useState([]); // Rename meals to bars for clarity
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('');
  const [showCityInput, setShowCityInput] = useState(false);
  const [fetchingDrink, setFetchingDrink] = useState(false);

  useEffect(() => {
    // No automatic fetch on component mount
  }, []);

  const fetchRandomDrinks = async () => {
    try {
      setFetchingDrink(true);
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/get_random_drink/');
      setDrinks([response.data.drinks[0]]);
      setShowCityInput(true); // Show city input after first drink is fetched
    } catch (error) {
      console.error('Error fetching drinks:', error);
    } finally {
      setLoading(false);
      setFetchingDrink(false);
    }
  };

  const fetchBarsByCity = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/api/search_nearby_bars/${city}/`); // Correct endpoint
      setDrinks(response.data.drink.drinks); // Get drinks data
      setBars(response.data.bars); // Get nearby bars
    } catch (error) {
      console.error('Error searching bars:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleCitySearch = async (e) => {
    e.preventDefault();
    fetchBarsByCity();
  };

  return (
    <div className="App" style={{
      background: 'linear-gradient(to bottom right, #333333, #444444, #6c00e0)',
      minHeight: '100vh',
      color: 'white',
      paddingTop: '20px',
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <img src={drinkImage} alt="Drink" className="img-fluid rounded mb-4" style={{ height: '400px' }} />
          </div>
          <div className="col-md-6">
            <h2 className="mb-4">Welcome to Drink Roulette!</h2>
            <p className="lead">
              Explore our refreshing selection of drinks. Click below to get a random drink recipe!
            </p>
            <button
              className="btn btn-primary mr-2"
              onClick={fetchRandomDrinks}
              disabled={fetchingDrink}
            >
              {fetchingDrink ? 'Fetching Drink...' : (drinks.length > 0 ? 'Get Another Random Drink' : 'Get Random Drink')}
            </button>
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
                <Drinks drinks={drinks} onRandomClick={fetchRandomDrinks} />
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
                        <button className="btn btn-outline-secondary" type="submit">Search Bars</button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <Bars bars={bars} /> {/* Adjust component to use bars */}
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

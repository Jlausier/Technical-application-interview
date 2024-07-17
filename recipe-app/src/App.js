import React, { useState } from 'react';
import './App.css';
import Drinks from './Components/Drinks'; 
import Breweries from './Components/Breweries';
import Footer from './Components/Footer';
import axios from 'axios';
import drinkImage from './Images/cocktails.jpg';

function App() {
  const [drinks, setDrinks] = useState([]);
  const [breweries, setBreweries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('');
  const [showCityInput, setShowCityInput] = useState(false);
  const [fetchingDrink, setFetchingDrink] = useState(false);
  const [drinkFetched, setDrinkFetched] = useState(false);
  const [citySearched, setCitySearched] = useState(false);
  const [noBreweries, setNoBreweries] = useState(false);

  const fetchRandomDrinks = async () => {
    try {
      setFetchingDrink(true);
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/random_drink/');
      setDrinks([response.data.drinks[0]]);
      setShowCityInput(true); // Show city input after first drink is fetched
      setDrinkFetched(true);
    } catch (error) {
      console.error('Error fetching drinks:', error);
    } finally {
      setLoading(false);
      setFetchingDrink(false);
    }
  };

  const fetchBreweriesByCity = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/api/search_nearby_breweries/${city}/`);
      const breweriesData = response.data.breweries;
      setBreweries(response.data.breweries);
      setCitySearched(true);
      setNoBreweries(breweriesData.length === 0);
    } catch (error) {
      console.error('Error searching breweries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCitySearch = async (e) => {
    e.preventDefault();
    fetchBreweriesByCity();
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
                        <button className="btn btn-outline-secondary" type="submit">Search Breweries</button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
              </div>
              {citySearched && ( // Conditionally render the header and Breweries component
              <div className="row">
                <div className="col-md-12">
                  {noBreweries ? (
                    <h4>No nearby breweries found for the city "{city}".</h4>
                  ) : (
                    <>
                      
                      <Breweries breweries={breweries} />
                    </>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;

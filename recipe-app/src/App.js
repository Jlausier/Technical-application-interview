// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header';
import Tacos from './Components/Tacos';
import Meals from './Components/Meals';
import Footer from './Components/Footer';

function App() {
  const [tacos, setTacos] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTacos();
    fetchMeals();
  }, []);

  const fetchTacos = async () => {
    try {
      const response = await fetch('/api/get_tacos/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTacos(data);
    } catch (error) {
      console.error('Error fetching tacos:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMeals = async () => {
    try {
      const response = await fetch('/api/get_meals/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMeals(data);
    } catch (error) {
      console.error('Error fetching meals:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="content">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            <Tacos tacos={tacos} />
            <Meals meals={meals} />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;

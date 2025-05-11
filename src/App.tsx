import logo from './pokedex-logo.png';
import './App.css';
import {fetchPokemon} from './Api';
import React, {useState} from 'react';

function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [error, setError] = useState(null);

  const randInt = (min, max) => {
    Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleSearch = async () => {
    try {
      const data = await fetchPokemon(searchName);
      setPokemonData(data);
      setError(null);
    }
    catch {
      setPokemonData(null);
      // setError(err.message);
    }
  };

  const handleInputChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleRandomSearch = async () => {
      const randNum = randInt(1, 1025);
      const data = await fetchPokemon(randNum);
      setPokemonData(data);
      setError(null);
      console.log(randNum);
  };

  return (
    <div className="App">
      <header id="App-header">
        <div className="logo-container">
          <img src={logo} className="App-logo" alt="pokedex logo" />
        </div>
        <div className="search-container">
          <label htmlFor="search" className="search-label">Pokemon Name</label>
          <input type="text" id="search" className="searchBar" placeholder="Pokemon Name..." value={searchName} onChange={handleInputChange}></input>
          <button className="searchButton" onClick={handleSearch}>Search</button>
        </div>
        <div className="randPokemon">
          <button className="randomPokemonButton" onClick={handleRandomSearch}>Random Pokemon !</button>
        </div>
      </header>
      <main className="App-main">
        <div className="App-main-background"></div>
    </main>
    </div>
  );
}

export default App;

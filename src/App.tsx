import logo from './pokedex-logo.png';
import './App.css';
import { fetchPokemon, fetchAbilityDetails } from './Api.tsx';
import React, { useState, useEffect } from 'react';

function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [error, setError] = useState(null);
  const [abilityDetails, setAbilityDetails] = useState([]);

  const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const handleSearch = async () => {
    try {
      const data = await fetchPokemon(searchName);
      setPokemonData(data);
      setError(null);
      fetchAbilities(data);
    } catch {
      setPokemonData(null);
    }
  };

  const handleInputChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleRandomSearch = async () => {
    const randNum = randInt(1, 1025);
    const data = await fetchPokemon(randNum.toString());
    setPokemonData(data);
    setError(null);
    fetchAbilities(data);
  };

  const fetchAbilities = async (data) => {
    const promises = data.abilities.map((item) => fetchAbilityDetails(item.ability.url));
    const details = await Promise.all(promises);
    setAbilityDetails(details);
  };

  return (
    <div className="App">
      <header id="App-header">
        <div className="logo-container">
          <img src={logo} className="App-logo" alt="pokedex logo" />
        </div>
        <div className="search-container">
          <label htmlFor="search" className="search-label">Pokemon Name</label>
          <input type="text" id="search" className="searchBar" value={searchName} onChange={handleInputChange} />
          <button className="searchButton" onClick={handleSearch}>Search</button>
        </div>
        <div className="randPokemon">
          <button className="randomPokemonButton" onClick={handleRandomSearch}>Random Pokemon !</button>
        </div>
      </header>
      <main className="App-main">
        {pokemonData && (
          <div className="pokemon-display">
            <h2 className="pokemon-name">{pokemonData.name.toUpperCase()}</h2>
            <img src={pokemonData.sprites.front_default} alt={pokemonData.name} className="pokemon-image" />
            <p className="pokedex-number">Pokedex Number: {pokemonData.id}</p>

            <div className="pokemon-types">
              <h3>Type:</h3>
              <ul>
                {pokemonData.types.map((t, index) => (
                  <li key={index} className="type-name">
                    {t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pokemon-abilities">
              <h3>Abilities:</h3>
              <ul>
                {abilityDetails.map((item, index) => {
                  const descEntry = item.effect_entries.find(e => e.language.name === 'en');
                  return (
                    <li key={index} className="ability-item">
                      <span className="ability-name">
                        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                      </span>
                      <p className="ability-description">{descEntry?.effect || 'No description available.'}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

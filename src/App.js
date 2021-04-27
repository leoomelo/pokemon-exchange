import axios from 'axios';
import React, { useState } from 'react';
import './App.css';
import PokeCombo from './components/PokeCombo'

function App() {
  const IS_FAIR_VALUE = 100

  const [selectedPokemonsPlayer1, setSelectedPokemonsPlayer1] = useState([])
  const [selectedPokemonsPlayer2, setSelectedPokemonsPlayer2] = useState([])
  
  function refreshBaseExperiencePlayer1 (pokemon) {
    selectedPokemonsPlayer1.forEach((selectedPokemon, index) => {
      if (selectedPokemon.comboNumber === pokemon.comboNumber) {
        selectedPokemonsPlayer1.splice(index, 1);
      }
    })
    setSelectedPokemonsPlayer1([...selectedPokemonsPlayer1, pokemon])
  };
  
  function refreshBaseExperiencePlayer2 (pokemon) {
    selectedPokemonsPlayer2.forEach((selectedPokemon, index) => {
      if (selectedPokemon.comboNumber === pokemon.comboNumber) {
        selectedPokemonsPlayer2.splice(index, 1);
      }
    })
    setSelectedPokemonsPlayer2([...selectedPokemonsPlayer2, pokemon])
  };

  function getTotalBaseExperienceByPlayer (pokemonsByPlayer) {
    let baseExperienceTotal = 0
    for (const pokemon of pokemonsByPlayer) {
      baseExperienceTotal += pokemon.baseExperience
    }
    return baseExperienceTotal
  }

  function isFairExchange (baseExperiencePlayer1, baseExperiencePlayer2) {
    return Math.abs(baseExperiencePlayer1 - baseExperiencePlayer2) < IS_FAIR_VALUE
  }

  return (
    <div className="container">
      <div className="left-side">
        <div className="player"><h2>Player 1</h2></div>
        <PokeCombo comboNumber={1} refreshBaseExperience={refreshBaseExperiencePlayer1} />
        <PokeCombo comboNumber={2} refreshBaseExperience={refreshBaseExperiencePlayer1} />
        <PokeCombo comboNumber={3} refreshBaseExperience={refreshBaseExperiencePlayer1} />
        <PokeCombo comboNumber={4} refreshBaseExperience={refreshBaseExperiencePlayer1} />
        <PokeCombo comboNumber={5} refreshBaseExperience={refreshBaseExperiencePlayer1} />
        <PokeCombo comboNumber={6} refreshBaseExperience={refreshBaseExperiencePlayer1} />
      </div>
      <div className="right-side">
      <div className="player"><h2>Player 2</h2></div>
        <PokeCombo comboNumber={7} refreshBaseExperience={refreshBaseExperiencePlayer2} />
        <PokeCombo comboNumber={8} refreshBaseExperience={refreshBaseExperiencePlayer2} />
        <PokeCombo comboNumber={9} refreshBaseExperience={refreshBaseExperiencePlayer2} />
        <PokeCombo comboNumber={10} refreshBaseExperience={refreshBaseExperiencePlayer2} />
        <PokeCombo comboNumber={11} refreshBaseExperience={refreshBaseExperiencePlayer2} />
        <PokeCombo comboNumber={12} refreshBaseExperience={refreshBaseExperiencePlayer2} />
      </div>
      <div className="display-base-experience">
        <p>Total: {getTotalBaseExperienceByPlayer(selectedPokemonsPlayer1)}</p>
        <ul>
          {selectedPokemonsPlayer1.map((item) => (
          <li key={item.comboNumber}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)} = {item.baseExperience}</li>
          ))}
        </ul>
      </div>
      <div className="display-base-experience">
        <p>Total: {getTotalBaseExperienceByPlayer(selectedPokemonsPlayer2)}</p>
        <ul>
          {selectedPokemonsPlayer2.map((item) => (
          <li key={item.comboNumber}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)} = {item.baseExperience}</li>
          ))}
        </ul>
      </div>
      <div className="is-fair-change">
        { (isFairExchange(getTotalBaseExperienceByPlayer(selectedPokemonsPlayer1), getTotalBaseExperienceByPlayer(selectedPokemonsPlayer2)) &&
          (selectedPokemonsPlayer1.length !== 0 && selectedPokemonsPlayer2.length !== 0)) &&
          <div>FAIR EXCHANGE</div>
        }
      </div>
      <button onClick={() => {
          axios.post('http://localhost:5000/fairExchange', {
            pointsPlayer1: 100,
            pointsPlayer2: 80,
            isFairExchange: true,
            date: new Date()
          },
          {
          headers: {
            'Content-Type': 'application/json'
          }})
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        }}>
          Click
        </button>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon'
import PokeCombo from '../PokeCombo/'
import '../../App.css';

let totalPlayer1 = 0
let totalPlayer2 = 0

function Game() {
  const IS_FAIR_VALUE = 100

  const [selectedPokemonsPlayer1, setSelectedPokemonsPlayer1] = useState([])
  const [selectedPokemonsPlayer2, setSelectedPokemonsPlayer2] = useState([])
  
  function refreshBaseExperiencePlayer1 (pokemon) {
    console.log('pokemon: ', pokemon.value)
    selectedPokemonsPlayer1.forEach((selectedPokemon, index) => {
      console.log('DENTRO DO FOREACH')
      if (selectedPokemon.comboNumber === pokemon.comboNumber) {
        selectedPokemonsPlayer1.splice(index, 1);
      }
    })
    console.log('ANTES DO SELECTED')
    setSelectedPokemonsPlayer1([...selectedPokemonsPlayer1, pokemon])
    totalPlayer1 += getTotalBaseExperienceByPlayer1(selectedPokemonsPlayer1)
  };
  
  function refreshBaseExperiencePlayer2 (pokemon) {
    selectedPokemonsPlayer2.forEach((selectedPokemon, index) => {
      if (selectedPokemon.comboNumber === pokemon.comboNumber) {
        selectedPokemonsPlayer2.splice(index, 1);
      }
    })
    setSelectedPokemonsPlayer2([...selectedPokemonsPlayer2, pokemon])
    totalPlayer2 += getTotalBaseExperienceByPlayer2(selectedPokemonsPlayer2)
  };

  function getTotalBaseExperienceByPlayer1 (pokemonsByPlayer) {
    let baseExperienceTotal = 0
    for (const pokemon of pokemonsByPlayer) {
      baseExperienceTotal += pokemon.baseExperience
    }
    totalPlayer1 = baseExperienceTotal
    return baseExperienceTotal
  }

  function getTotalBaseExperienceByPlayer2 (pokemonsByPlayer) {
    let baseExperienceTotal = 0
    for (const pokemon of pokemonsByPlayer) {
      baseExperienceTotal += pokemon.baseExperience
    }
    totalPlayer2 = baseExperienceTotal
    return baseExperienceTotal
  }

  function isFairExchange (baseExperiencePlayer1, baseExperiencePlayer2) {
    return Math.abs(baseExperiencePlayer1 - baseExperiencePlayer2) < IS_FAIR_VALUE
  }

  return(
    <>
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
      <div className="is-fair-change">
        { (isFairExchange(getTotalBaseExperienceByPlayer1(selectedPokemonsPlayer1), getTotalBaseExperienceByPlayer2(selectedPokemonsPlayer2)) &&
          (selectedPokemonsPlayer1.length !== 0 && selectedPokemonsPlayer2.length !== 0)) &&
          <div>FAIR EXCHANGE</div>
        }
      </div>
      <div className="parent-base-experience">
        <div className="display-base-experience">
          <p>Total: {getTotalBaseExperienceByPlayer1(selectedPokemonsPlayer1)}</p>
          <ul>
            {selectedPokemonsPlayer1.map((item) => (
            item.name && <li key={item.comboNumber}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)} = {item.baseExperience}</li>
            ))}
          </ul>
        </div>
        <div className="display-base-experience">
          <p>Total: {getTotalBaseExperienceByPlayer2(selectedPokemonsPlayer2)}</p>
          <ul>
            {selectedPokemonsPlayer2.map((item) => (
            item.name && <li key={item.comboNumber}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)} = {item.baseExperience}</li>
            ))}
          </ul>
        </div>
      </div>
      <button className="btn btn-primary w-100" onClick={() => {
          axios.post('http://localhost:5000/fairExchange', {
            pokeSelectedPlayer1: selectedPokemonsPlayer1,
            pointsPlayer1: totalPlayer1,
            pokeSelectedPlayer2: selectedPokemonsPlayer2,
            pointsPlayer2: totalPlayer2,
            isFairExchange: isFairExchange(totalPlayer1, totalPlayer2),
            date: DateTime.now().setLocale('pt-BR').toLocaleString(DateTime.DATETIME_SHORT)
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
          Save Exchange
      </button>
      <div>
        <p className="reminder">* Fair Exchange = Difference less than 100 pts.</p>
      </div>
    </div>
    </>
  )
}

export default Game
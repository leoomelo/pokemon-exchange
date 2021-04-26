import React, { useState } from 'react'
import axios from 'axios'
import Pokemons from '../../db/json/pokemons.json'

function compare( a, b ) {
  if ( a.name < b.name ){
    return -1;
  }
  if ( a.name > b.name ){
    return 1;
  }
  return 0;
}

function getPokemonIdByURL(url) {
  const match = url.match(/v2\/pokemon\/(\d+)/)
  if(match) {
    return match[1]
  }
  return 0
}

async function findPokemonById (id) {
  const URL = `https://pokeapi.co/api/v2/pokemon/${id}`
  return await axios.get(URL)
}

function PokeCombo( {comboNumber, refreshBaseExperience} ) {
  const [pokemonSelected, setPokemonSelected] = useState([])
  
  Pokemons.results.sort( compare );
  
  return(
    <div className="card-combo">
      <select name="pokemons"
        id="pokemons" 
        onChange={async (item) => {
          setPokemonSelected(item.target.value)
          const pokemon = await findPokemonById(item.target.value)
          const baseExperience = pokemon.data.base_experience
          refreshBaseExperience({
            name: pokemon.data.name, 
            baseExperience: baseExperience,
            comboNumber: comboNumber
          })
        }}>
        <option value="-1">Selecione um pokemon:</option>
        {Pokemons.results.map((item) => (
          <option value={getPokemonIdByURL(item.url)} key={item.name}>{item.name}</option>
        ))}
      </select>
      <div className="my-card">
        <div className="card-image">
          {pokemonSelected.length > 0 &&
            <img src={`https://pokeres.bastionbot.org/images/pokemon/${pokemonSelected}.png`}
              alt="pokemon"
              width="160"
              height="160"
            />
          }
        </div>
      </div>
    </div>
  )
}

export default PokeCombo
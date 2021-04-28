import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../App.css';

function extractPokemonsFromExchange(pokemons) {
  let result = []
  for (const pokemon of pokemons) {
    result.push(`${pokemon.name} `)
  }
  return result
}

function compareByDate( a, b ) {
  if ( a.date < b.date ){
    return -1;
  }
  if ( a.date > b.date ){
    return 1;
  }
  return 0;
}

function History() {

  const [exchanges, setExchanges] = useState([])

  const getExchanges = async() => {
    const exchanges = await axios.get('http://localhost:5000/exchanges')
    exchanges.data.sort(compareByDate)
    setExchanges(exchanges.data)
  }
  useEffect(() => {
    getExchanges()
  }, [])

  return(
    <div className="history">
      <table className="table table-details">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Pokemons - Player1</th>
            <th scope="col">Pts - Player1</th>
            <th scope="col">Pokemons - Player2</th>
            <th scope="col">Pts - Player2</th>
            <th scope="col">Fair Exchange</th>
            <th scope="col">Date Exchange</th>
          </tr>
        </thead>
        <tbody>
        {exchanges.length > 0 &&
        exchanges.map((item, index) => ( 
          <tr>
            <th scope="row">{index + 1}</th>
            <td>{extractPokemonsFromExchange(item.pokeSelectedPlayer1)}</td>
            <td>{item.pointsPlayer1}</td>
            <td>{extractPokemonsFromExchange(item.pokeSelectedPlayer2)}</td>
            <td>{item.pointsPlayer2}</td>
            <td>{item.isFairExchange ? 'Yes' : 'No'}</td>
            <td>{item.date}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default History
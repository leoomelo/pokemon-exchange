import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../App.css';

function History() {

  const [exchanges, setExchanges] = useState([])

  const getExchanges = async() => {
    const exchanges = await axios.get('http://localhost:5000/exchanges')
    console.log(exchanges)
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
            <td>Pikachu - Bastol</td>
            <td>{item.pointsPlayer1}</td>
            <td>Pikachu - Bastol</td>
            <td>{item.pointsPlayer2}</td>
            <td>{item.isFairExchange}</td>
            <td>{item.date}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default History
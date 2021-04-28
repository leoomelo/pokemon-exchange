const Datastore = require('nedb')

const options = {
  filename: './db/pokemonexchange.db',
  autoload: true
}
const db = new Datastore(options);

async function saveFairExchange(exchange) {
  db.insert(exchange, (err, docs) => {
    if (err) throw Error
    return docs[0]
  })
}

function findAll() {
  return new Promise((resolve, reject) => {
    db.find({}, (err, docs) => {
      if (err) reject('Error to find exchanges')
      resolve(docs)
    })
  })
}

module.exports = {
  saveFairExchange,
  findAll
}


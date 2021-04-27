const express = require('express')
const path = require('path')
const cors = require('cors')
const { saveFairExchange, findAll } = require('./db/db')
const app = express()
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cors());
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

app.get('/test', (req, res) => {
  res.json('Hello World!')
})

app.get('/exchanges', async (req, res) => {
  findAll()
    .then(exchanges => res.json(exchanges))
})

app.post('/fairExchange', (req, res) => {
  const body = req.body
  saveFairExchange(body)
  res.json(body)
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
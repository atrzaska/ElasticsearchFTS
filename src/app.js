const express = require('express')
const morgan = require('morgan')
const autocomplete = require('./services/autocomplete')

const app = express()
const port = 4000

const handleAutocomplete = (index) => (req, res) =>
  autocomplete({ query: req.query.q, index }).then((results) =>
    res.json(results)
  )

app.use(morgan('dev'))
app.use(express.json())
app.get('/autocomplete/countries', handleAutocomplete('countries'))
app.get('/autocomplete/cities', handleAutocomplete('cities'))
app.listen(port, () => console.log(`Listening at http://localhost:${port}`))

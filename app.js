const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))

// app.use((req, res) => {
//     res.send('Hello Grace!')
// })

function handleGetMovie(req, res) {
    res.json(validMovie)
}

app.get('/movie', handleGetMovie)

const validMovie = require('./moviedex.json')

module.exports = app
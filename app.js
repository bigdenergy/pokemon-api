const express = require("express")
const morgan = require("morgan")
const favicon = require("serve-favicon")
const bodyParser = require("body-parser")
const path = require('path')
const sequelize = require("./src/db/sequelize")

const app = express() 
const port = 3000;

// Middleware d'ajout de favicon + journalisation des requêtes
app
    .use(favicon(path.join(__dirname, "/favicon.ico")))
    .use(morgan("dev"))
    .use(bodyParser.json())

sequelize.initDb();

// Create
require('./src/routes/createPokemon')(app)

// Read
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonsByPk')(app)
require('./src/routes/findPokemonsByTypes')(app)

// Update
require('./src/routes/updatePokemon')(app)

// Delete
require('./src/routes/deletePokemon')(app)

// Error 404 management
app.use(({res}) => {
    const message = `Oops! The requested resource was not found.`
    res.status(404).json({message})
})

app.listen(port) 
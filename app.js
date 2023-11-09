const express = require("express")
const favicon = require("serve-favicon")
const bodyParser = require("body-parser")
const path = require('path')
const sequelize = require("./src/db/sequelize")
const morgan = require('morgan')
const cors = require('cors')

const app = express() 
const PORT = process.env.PORT || 3000

// Middleware d'ajout de favicon + journalisation des requêtes
app
    .use(favicon(path.join(__dirname, "/favicon.ico")))
    .use(morgan("dev"))
    .use(bodyParser.json())
    .use(cors())

sequelize.initDb();

app.get('/', (req,res) => {
    res.json('Hello Netlify!')
})

// Create
require('./src/routes/pokemons/createPokemon')(app)

// Read
require('./src/routes/pokemons/findAllPokemons')(app)
require('./src/routes/pokemons/findPokemonsByPk')(app)

// Update
require('./src/routes/pokemons/updatePokemon')(app)

// Delete
require('./src/routes/pokemons/deletePokemon')(app)

// Create User
require('./src/routes/users/createUser')(app)

// Update an User
require('./src/routes/users/updateUser')(app)

// Login
require('./src/routes/users/login')(app)


// Error 404 management
app.use(({res}) => {
    const message = `Oops! The requested resource was not found.`
    res.status(404).json({message})
})

app.listen(PORT) 
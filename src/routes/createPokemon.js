const { Pokemon } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.post('/api/pokemons', auth, (req, res) => {
    console.log(req.body)
    Pokemon.create(req.body)
      .then(pokemons => {
        
        const message = `Pokemon ${req.body.name} has been successfully created`
        res.json({ message, data: pokemons })
      })
      .catch(error => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error })
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error })
        }
        const message = `Your Pokemon ${req.body.name} could not be created. Please try again later.`
        res.status(500).json({ message, data: error })
      })
  })
} 
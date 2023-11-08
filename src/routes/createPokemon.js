const { Pokemon } = require('../db/sequelize')
module.exports = (app) => {
  app.post('/api/pokemons', (req, res) => {
    Pokemon.create(req.body)
      .then(pokemons => {
        const message = `Pokemons ${req.body.name} has been successfully created`
        res.json({message, data: pokemons})
      })
      .catch(error => {
        console.log(req.body)
				const message = `Your Pokemon ${req.body.name} could not be created. Please try again later.`
				res.status(500).json({ message, data: error })
			})
  })
} 
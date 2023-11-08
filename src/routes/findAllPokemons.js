const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
	app.get('/api/pokemons', (req, res) => {
		Pokemon.findAll()
			.then(pokemons => {
				const message = "Pokemons list has been successfully downloaded"
				res.json({message, data: pokemons})
			})
			.catch(error => {
				const message = `Internal Server Error ${res.status(500)}. Please try later.`
				res.status(500).json({ message, data: error })
			})
	})
} 
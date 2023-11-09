const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
	app.get('/api/pokemons', auth, (req, res) => {
		if (req.query.name) {
			const name = req.query.name
			const limit = parseInt(req.query.limit || 5)

			if (name.length <= 2) {
				const message = `Pokemon name should have more than 2 characters`
				return res.status(400).json({ message })
			}

			return Pokemon.findAndCountAll({
				where: {
					name: {
						[Op.like]: `%${name}%`
					}
				},
				order: ['name'],
				limit: limit
			})
				.then(({ count, rows }) => {
					const message = `There is ${count} pokemons for your research ${name} with limit ${limit}`
					res.json({ message, data: rows })
				})
		} else {
			return Pokemon.findAll(
				{
					order: ['name']
				})
				.then(pokemons => {
					const message = "Pokemons list has been successfully downloaded"
					res.json({ message, data: pokemons })
				})
				.catch(error => {
					const message = `Internal Server Error ${res.status(500)}. Please try later.`
					res.status(500).json({ message, data: error })
				})
		}
	})
} 
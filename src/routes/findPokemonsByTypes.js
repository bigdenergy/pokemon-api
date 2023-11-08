const { Pokemon } = require('../db/sequelize');
const { Op } = require("sequelize");

module.exports = (app) => {
	app.get('/api/pokemons/types/:param', (req, res) => {
		const type = req.params.param;
		// Recherche de Pokémon par type spécifique
		Pokemon.findAll({
		where: {
			types: {
			[Op.like]: '%' + type + '%'
			}
		}
		})
		.then(pokemons => {
			if (pokemons.length > 0) {
				const message = `${pokemons.length} Pokémon(s) found with the specified type`;
				res.json({ message, data: pokemons });
			} 
			const message = `No Pokémon found with the specified type`;
			res.status(404).json({ message });
			
		})
		.catch(error => {
			const message = `Internal Server Error. Please try later.`;
			res.status(500).json({ message, data: error });
		});
	});
};

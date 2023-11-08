const { Pokemon } = require('../db/sequelize');

module.exports = (app) => {
	app.get('/api/pokemons/:param', (req, res) => {
		const param = req.params.param;

		// Vérifie si le paramètre est un nombre (ID)
		if (!isNaN(param)) {
		// Recherche par ID
		Pokemon.findByPk(param)
			.then(pokemon => {
			if (pokemon) {
				const message = `${pokemon.name} has been successfully found by ID`;
				res.json({ message, data: pokemon });
			} else {
				const message = `Pokemon with ID ${param} not found`;
				res.status(404).json({ message });
			}
			})
			.catch(error => {
			const message = `Error while retrieving Pokemon by ID ${param}. Please try again later.`;
			res.status(500).json({ message, data: error });
			});
		} else {
			// Recherche par nom
			Pokemon.findOne({
				where: { name: param }
			})
			.then(pokemon => {
				if (pokemon) {
				const message = `${pokemon.name} has been successfully found by name`;
					res.json({ message, data: pokemon });
				} else {
					const message = `Pokemon with name ${param} has been not found`;
					res.status(404).json({ message });
				}
			})
			.catch(error => {
				const message = `Error while retrieving Pokemon by name ${param}. Please try again later.`;
				res.status(500).json({ message, data: error });
			});
		}
	});
};
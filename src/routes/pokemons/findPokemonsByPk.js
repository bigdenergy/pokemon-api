const { Pokemon } = require('../../db/sequelize');
const auth = require('../../auth/auth')

module.exports = (app) => {
  app.get('/api/pokemons/:id', auth, (req, res) => {
    const id = req.params.id;
    // Recherche par ID
    Pokemon.findByPk(id)
      .then(pokemon => {
        if (pokemon) {
          const message = `${pokemon.name} has been successfully found.`;
          res.json({ message, data: pokemon });
        } else {
          const message = `Pokemon with ID ${id} not found`;
          res.status(404).json({ message });
        }
      })
      .catch(error => {
        const message = `Error while retrieving Pokemon by ID ${id}. Please try again later.`;
        res.status(500).json({ message, data: error });
      });
  });
};
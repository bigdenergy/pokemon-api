const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.delete('/api/pokemons/:id', (req, res) => {
        Pokemon.findByPk(req.params.id).then(pokemon => {
            if(pokemon === null ) {
                const message = `Pokemon ${req.params.id} cannot be deleted. Try with another id!`
                return res.status(404).json({message})
            }
            const pokemonDeleted = pokemon;
            Pokemon.destroy({
                where: { id: pokemon.id}
            })
            .then (_ => {
                const message = `Pokemon ${pokemonDeleted.name} successfully deleted`
                res.json({message, data: pokemonDeleted})
            })
        })
        .catch(error => {
            const message = `Pokemon ${pokemon.name} could not be deleted. Please try again later`
            res.status(500).json({ message, data: error })
        })
    })
}  
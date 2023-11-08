const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.put('/api/pokemons/:id', (req, res) => {
        const id = req.params.id
        Pokemon.update(req.body, {
            where: { id: id }
        })
        .then (_ => {
            return Pokemon.findByPk(id).then(pokemon => {
                if(pokemon === null) {
                    const message = `Pokemon ${pokemon.name} doesn't exist.`
                    return res.status(400).json({ message, data: error })
                }
                const message = `Pokemon successfully ${pokemon.name} updated!`
                res.json({message, data: pokemon})
            })
        })
        .catch(error => {
            const message = `Pokemon ${req.params.id} could not be updated. Please try again later.`
            res.status(500).json({ message, data: error })
        })  
    })
} 
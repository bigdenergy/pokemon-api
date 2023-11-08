const { Sequelize, DataTypes } = require('sequelize')

const PokemonModel = require('../models/pokemon')
//const UserModel = require('../models/user')

const pokemons = require('./mock-pokemon')


  sequelize = new Sequelize('pokedex', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: false 
  })
  
const Pokemon = PokemonModel(sequelize, DataTypes)
//const User = UserModel(sequelize, DataTypes)

const initDb = () => {
  return sequelize.sync({force: true})
  .then(async () => {
    for (const pokemon of pokemons) {
      const existingPokemon = await Pokemon.findOne({ where: { name: pokemon.name } });
      if (!existingPokemon) {
        await Pokemon.create({ 
          name: pokemon.name,
          hp: pokemon.hp, 
          cp: pokemon.cp,
          picture: pokemon.picture,
          types: pokemon.types
        })
      }
    }
    console.log('Database successfully initialized!')
  });
}


module.exports = { 
  initDb, Pokemon, //User
}
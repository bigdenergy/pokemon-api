const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const PokemonModel = require('../models/pokemon');
const UserModel = require('../models/user');
const pokemons = require('./mock-pokemon');
const private_key = require('../auth/private_key');

if(process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize('kk8u5y871hfoaw9y', 't09tvm6qofrtvc7h', 'ryujse9ftf40wpqn', {
    host: 'klbcedmmqp7w17ik.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: true
  })
} else {
 sequelize = new Sequelize('pokedex', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false,
});
}

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Initializing the database...');

    for (const pokemon of pokemons) {
      const existingPokemon = await Pokemon.findOne({ where: { name: pokemon.name } });
      if (!existingPokemon) {
        // Create Pokemon using data from mock-pokemon.js
        await Pokemon.create({
          name: pokemon.name,
          hp: pokemon.hp,
          cp: pokemon.cp,
          picture: pokemon.picture,
          types: pokemon.types,
        });
      }
    }

    // Hash the private_key for user password
    const hashedPrivateKey = await bcrypt.hash(private_key, 10);

    // Create a User
    await User.create({
      username: 'pikachu',
      password: hashedPrivateKey,
    });

    console.log('Database successfully initialized!');

  } catch (error) {
    console.error('Error initializing the database:', error);
  }
};

module.exports = {
  initDb,
  Pokemon,
  User,
};

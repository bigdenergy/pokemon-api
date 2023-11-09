/* L’API Rest et la Base de données : Créer un modèle Sequelize */
const validTypes = [
  "Plante",
  "Feu",
  "Eau",
  "Électrique",
  "Glace",
  "Combat",
  "Poison",
  "Sol",
  "Normal",
  "Electrik",
  "Vol",
  "Psy",
  "Insecte",
  "Roche",
  "Spectre",
  "Dragon",
  "Acier",
  "Ténèbres",
  "Fée"
]

module.exports = (sequelize, DataTypes) => {

  return sequelize.define('Pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Name is already take."
      },
      validate: {
        notEmpty: { msg: "Name cannot be empty." },
        notNull: { msg: "Name is a required propriety." }
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'Please use integer on HP.' },
        notNull: { msg: 'HP is a required propriety.' },
        min: {
          args: [1],
          msg: "HP should be min 1."
        },
        max: {
          args: [999],
          msg: "hp should be max 999."
        }
      }
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'Please use integer on CP.' },
        notNull: { msg: 'CP is a required propriety.' },
        min: {
          args: [1],
          msg: "CP should be min 1."
        },
        max: {
          args: [999],
          msg: "CP should be max 999."
        }
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: { msg: 'Please use a valid url on picture.' },
        notNull: { msg: 'Picture is a required propriety.' }
      }
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('types').split(',')
      },
      set(types) {
        this.setDataValue('types', types.join())
      },
      validate: {
        isTypesValid(value) {
          if (!value) {
            throw new Error('Pokemon should have 1 type.')
          }
          if (value.split(',').length > 3) {
            throw new Error("Pokemon shouldn't have more than 3 types.")
          }
          value.split(',').forEach(type => {
            if (!validTypes.includes(type)) {
              throw new Error(`Pokemon should contains this types : ${validTypes}.`)
            }
          });
        }
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: true,
  })
} 
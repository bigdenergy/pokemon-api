module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Username already found. Please try with another username."
      },
      validate: {
        notEmpty: { msg: "Username cannot be empty." },
        notNull: { msg: "Username is a required propriety." }
      }
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Password cannot be empty." },
        notNull: { msg: "Password is a required propriety." }
      }
    }
  })
}
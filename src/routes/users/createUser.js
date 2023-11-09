const { User } = require('../../db/sequelize');
const bcrypt = require('bcrypt');
const { ValidationError } = require('sequelize')

module.exports = (app) => {
  app.post('/api/users', (req, res) => {
    console.log('Creating a user...');
    bcrypt.hash(req.body.password, 10) 
      .then(hash => {
        User.create({ 
          username: req.body.username,  
          password: hash 
        })
        .then(user => {
          const message = `Welcome ${user.username}. Your account has been successfully created`;
          res.status(201).json({ message, data: user });
        })
        .catch(error => {
          if (error instanceof ValidationError) {
            return res.status(400).json({ message: error.message, data: error })
          }
          if (error instanceof UniqueConstraintError) {
            return res.status(400).json({ message: error.message, data: error })
          }
        });
      })
      .catch(error => {
        const message = 'An error occurred while hashing the password.';
        res.status(500).json({ message, data: error });
      });
  });
};

const { User } = require('../db/sequelize');
const bcrypt = require('bcrypt');
const private_key = require('../auth/private_key');

module.exports = (app) => {
  app.post('/api/user', (req, res) => {
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
          const message = ` ${req.body.username}, your account couldn't be created. Please try again later.`;
          res.status(500).json({ message, data: error });
        });
      })
      .catch(error => {
        const message = 'An error occurred while hashing the password.';
        res.status(500).json({ message, data: error });
      });
  });
};

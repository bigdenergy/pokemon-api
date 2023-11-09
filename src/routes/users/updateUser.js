const { User } = require('../../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../../auth/auth')
const bcrypt = require('bcrypt')

module.exports = (app) => {
    app.put('/api/users/:id', auth, (req, res) => {
        const id = req.params.id
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
            User.update(
                { username: req.body.username, password: hash },
                { where:{ id: id }})
            })
            .then(_ => {
                return User.findByPk(id).then(user => {
                    if (user === null) {
                        const message = `User ${user.username} doesn't exist.`
                        return res.status(400).json({ message, data: error })
                    }
                    const message = `${user.username} updated!`
                    res.json({ message, data: user })
                })
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message, data: error })
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({ message: error.message, data: error })
                }
                const message = `Account ${req.body.username} could not be updated. Please try again later.`
                res.status(500).json({ message, data: error })
            })
    })
} 
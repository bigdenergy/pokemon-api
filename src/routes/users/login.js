const { User } = require('../../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../../auth/private_key')

module.exports = (app) => {
	app.post('/api/login', (req, res) => {
		User.findOne({ where: { username: req.body.username } })
		.then(user => {
			console.log(user)
			if (!user) {
				const message = `User not found.`
				return res.status(404).json({ message })
			}

			bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
				if (!isPasswordValid) {
					const message = `User password is incorrect.`
					return res.status(401).json({ message })
				}

				// send valid token
				const token = jwt.sign(
					{ userId: user.id },
					privateKey,
					{ expiresIn: '24h' }
				)

				const message = `User successfully connected.`
				return res.json({ message, data: user, token })
			})
		})
		.catch (error => {
			const message = `User can't connect. Please try later.`
			return res.json({ message, data: error})
		})
	})
}
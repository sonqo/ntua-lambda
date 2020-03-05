const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const keys = require('../config/keys');
const User = require('../models/User');
const Token = require('../models/Token');
const Actual = require('../models/Actual');
const Forecast = require('../models/Forecast');
const Generation = require('../models/Generation');
const authFunction = require('../validation/auth');

mongoose
	.connect('mongodb://localhost:27017/Market', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.catch((err) => console.error('Problem connecting to MongoDB', err));

router.get('/', (req, res) => {
	res.send('Energy Market App');
});

router.get('/HealthCheck', (req, res) => {
	while (mongoose.connection.readyState == 2);
	if (mongoose.connection.readyState == 1) {
		res.json({
			status: 'OK'
		});
	} else {
		res.json({
			status: 'FAIL'
		});
	}
});

router.get('/Reset', (req, res) => {
	User.deleteMany({
		username: { $ne: 'admin' }
	}).then(
		Actual.deleteMany({}).then(
			Generation.deleteMany({}).then(
				Forecast.deleteMany({}).then(
					res.json({
						status: 'OK'
					})
				)
			)
		)
	);
});

router.post('/Login', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	User.findOne({
		username,
		password
	}).then((user) => {
		if (!user) {
			res.sendStatus(403); // No data, user not found
		}
		const payload = {
			username: user.username,
			password: user.password
		};
		const token = jwt.sign(payload, keys.JWT_KEY);
		Token.findOne({
			username
		}).then((t_user) => {
			if (!t_user) {
				const newToken = new Token({
					username: username,
					token: token
				});
				newToken.save();
				res.json({
					token: token
				});
			} else res.sendStatus(400); // Bad request, already logged in
		});
	});
});

router.delete('/Logout', authFunction.logout, async (req, res) => {
	await Token.findOne({
		username: req.user.username
	}).then(async (found) => {
		if (!found) {
			res.sendStatus(401); // Not authorized
		} else {
			await Token.deleteMany({
				username: req.user.username
			}).then(res.sendStatus(200));
		}
	});
});

module.exports = router;

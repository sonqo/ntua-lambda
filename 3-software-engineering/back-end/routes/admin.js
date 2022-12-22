const mongoose = require('mongoose');
const router = require('express').Router();

const User = require('../models/User');
const authFunction = require('../validation/auth');
const validateLoginInput = require('../validation/login');

mongoose
	.connect('mongodb://localhost:27017/Market', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.catch((err) => console.error('Problem connecting to MongoDB', err));

router.post('/users', authFunction.noQuota, (req, res) => {
	if (req.user.username == 'admin') {
		const { errors, isValid } = validateLoginInput(req.body);

		// Check Validation
		if (!isValid) {
			res.sendStatus(400); // Bad request, not all fields are completed
		}
		User.findOne({
			username: req.body.username
		}).then((user) => {
			if (user) {
				res.sendStatus(400); // Bad request, username already in use
			} else {
				// Create a new user
				const newUser = new User({
					username: req.body.username,
					password: req.body.password,
					email: req.body.email,
					quota: req.body.quota // Rate-limiter
				});
				// Save new user to database
				newUser
					.save()
					.then((user) => res.json(user))
					.catch((err) => console.log(err));
			}
		});
	} else res.sendStatus(401); // Not authorized
});

router.get('/users/:username', authFunction.noQuota, (req, res) => {
	if (req.user.username == 'admin') {
		User.findOne({
			username: req.params.username
		}).then(async (user) => {
			if (!user) {
				res.sendStatus(403); // No data, user not found
			} else {
				docs = await User.find({ username: req.params.username });
				res.send(docs);
			}
		});
	} else res.sendStatus(401); // Not authorized
});

router.put('/users/:username', authFunction.noQuota, (req, res) => {
	if (req.user.username == 'admin') {
		User.findOne({
			username: req.params.username
		}).then(async (user) => {
			if (user) {
				User.updateOne(
					{ username: req.params.username },
					{
						$set: {
							password: req.body.password,
							email: req.body.email,
							quota: req.body.quota
						}
					}
				)
					.then(
						res.json({
							Message: `User ${req.params.username} updated`
						})
					)
					.catch((err) => console.log(err));
			} else res.sendStatus(403); // No data, user not found
		});
	} else res.sendStatus(401); // Not authorized
});

module.exports = router;

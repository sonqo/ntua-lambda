const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const User = require('../models/User');
const Token = require('../models/Token');

function authenticateTokenAPI(req, res, next) {
	const authHeader = req.headers['x-observatory-auth'];
	const curr_token = authHeader && authHeader.split(' ')[1];
	if (curr_token == null) {
		res.sendStatus(401); // Not authorized
	} else {
		jwt.verify(curr_token, keys.JWT_KEY, async (err, user) => {
			if (err) {
				res.sendStatus(401); // Not authorized
			} else {
				await Token.findOne({
					username: user.username,
					token: curr_token
				}).then(async (valid_user) => {
					if (valid_user) {
						const docs = await User.findOne({ username: user.username });
						const new_quota = docs.quota - 1;
						if (docs.quota >= 1) {
							User.updateOne(
								{ username: user.username },
								{
									$set: {
										password: docs.password,
										email: docs.email,
										quota: new_quota
									}
								}
							).then((req.user = user));
						} else if (docs.quota == 0) {
							res.sendStatus(402); // Out of quota
						} else {
							req.user = user;
						}
						next();
					} else {
						res.sendStatus(401);
					}
				});
			}
		});
	}
}

function authenticateTokenLG(req, res, next) {
	const authHeader = req.headers['x-observatory-auth'];
	const curr_token = authHeader && authHeader.split(' ')[1];
	if (curr_token == null) {
		res.sendStatus(401); // Not authorized
	}
	jwt.verify(curr_token, keys.JWT_KEY, async (err, user) => {
		if (err) {
			res.sendStatus(401); // Not authorized
		} else {
			await Token.findOne({
				username: user.username,
				token: curr_token
			}).then((valid_user) => {
				if (valid_user) {
					req.user = user;
					next();
				} else {
					res.sendStatus(401);
				}
			});
		}
	});
}

function authenticateTokenNOQUOTA(req, res, next) {
	const authHeader = req.headers['x-observatory-auth'];
	const curr_token = authHeader && authHeader.split(' ')[1];
	if (curr_token == null) {
		res.sendStatus(401); // Not authorized
	} else {
		jwt.verify(curr_token, keys.JWT_KEY, async (err, user) => {
			if (err) {
				res.sendStatus(401); // Not authorized
			} else {
				await Token.findOne({
					username: user.username,
					token: curr_token
				}).then(async (valid_user) => {
					if (valid_user) {
						const docs = await User.findOne({ username: user.username });
						if (docs.quota >= 1) {
							req.user = valid_user;
						} else if (docs.quota == 0) {
							res.sendStatus(402); // Out of quota
						} else {
							req.user = user;
						}
						next();
					} else {
						res.sendStatus(401);
					}
				});
			}
		});
	}
}

module.exports = {
	default: authenticateTokenAPI,
	noQuota: authenticateTokenNOQUOTA,
	logout: authenticateTokenLG
};

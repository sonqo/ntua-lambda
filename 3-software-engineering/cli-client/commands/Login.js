const fs = require('fs');
const axios = require('axios');

const loginf = async (username_p, password_p) => {
	if (username_p == null && password_p == null) {
		console.log('Available options: --username --password');
	} else {
		await axios
			.post('http://localhost:8765/energy/api/Login', {
				username: username_p,
				password: password_p
			})
			.then((res) => {
				const curr = res.data.token;
				fs.writeFile('./softeng19bAPI.token', curr, function(err) {
					if (err) {
						return console.log(err);
					} else {
						console.log('You are now logged in');
					}
				});
			})
			.catch((err) =>
				console.log(
					'Status code ' + err.response.status + ': ' + err.response.statusText
				)
			);
	}
};

module.exports = {
	loginf
};

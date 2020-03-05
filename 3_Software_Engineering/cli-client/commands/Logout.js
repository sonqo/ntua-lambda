const fs = require('fs');
const axios = require('axios');

const logoutf = async () => {
	try {
		const token = fs.readFileSync('./softeng19bAPI.token');

		await axios
			.delete('http://localhost:8765/energy/api/Logout', {
				headers: {
					'X-OBSERVATORY-AUTH': `Bearer ${token}`
				}
			})
			.then(async () => {
				fs.unlink('./softeng19bAPI.token', (err) => {
					console.log('You are not logged out');
				});
			})
			.catch((err) => {
				console.log(
					'Status code ' + err.response.status + ': ' + err.response.statusText
				);
			});
	} catch {
		console.log('Status code 401: Unauthorized');
	}
};

module.exports = { logoutf };

const axios = require('axios');

const healthf = async () => {
	await axios
		.get('http://localhost:8765/energy/api/HealthCheck')
		.then((res) => {
			console.log(res.data);
		});
};

module.exports = { healthf };

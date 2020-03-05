const axios = require('axios');

const resetf = async () => {
	await axios.get('http://localhost:8765/energy/api/Reset').then((res) => {
		console.log(res.data);
	});
};

module.exports = { resetf };

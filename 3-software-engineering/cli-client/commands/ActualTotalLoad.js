const fs = require('fs');
const axios = require('axios');

const actualf = async (
	area_p,
	timeres_p,
	date_p,
	month_p,
	year_p,
	format_p
) => {
	if (
		area_p == null &&
		isNaN(timeres_p) &&
		date_p == null &&
		month_p == null &&
		year_p == null &&
		format_p == null
	) {
		console.log(
			'Available options: --area --timeres --date --month --year --format'
		);
	} else {
		try {
			if (date_p != null) {
				const token = fs.readFileSync('./softeng19bAPI.token');
				await axios
					.get(
						`http://localhost:8765/energy/api/ActualTotalLoad/${area_p}/${timeres_p}/date/${date_p}/?format=${
							format_p == null ? 'json' : format_p
						}`,
						{
							headers: {
								'X-OBSERVATORY-AUTH': `Bearer ${token}`
							}
						}
					)
					.then((res) => {
						console.log(res.data);
					})
					.catch((err) => {
						console.log(
							'Status code ' +
								err.response.status +
								': ' +
								err.response.statusText
						);
					});
			} else if (month_p != null) {
				await axios
					.get(
						`http://localhost:8765/energy/api/ActualTotalLoad/${area_p}/${timeres_p}/month/${month_p}/?format=${
							format_p == null ? 'json' : format_p
						}`,
						{
							headers: {
								'X-OBSERVATORY-AUTH': `Bearer ${token}`
							}
						}
					)
					.then((res) => {
						console.log(res.data);
					})
					.catch((err) => {
						console.log(
							'Status code ' +
								err.response.status +
								': ' +
								err.response.statusText
						);
					});
			} else if (year_p != null) {
				await axios
					.get(
						`http://localhost:8765/energy/api/ActualTotalLoad/${area_p}/${timeres_p}/year/${year_p}/?format=${
							format_p == null ? 'json' : format_p
						}`,
						{
							headers: {
								'X-OBSERVATORY-AUTH': `Bearer ${token}`
							}
						}
					)
					.then((res) => {
						console.log(res.data);
					})
					.catch((err) => {
						console.log(
							'Status code ' +
								err.response.status +
								': ' +
								err.response.statusText
						);
					});
			} else {
				console.log('Status code: 400: Bad request');
			}
		} catch {
			console.log('Status code 401: Unauthorized');
		}
	}
};

module.exports = { actualf };

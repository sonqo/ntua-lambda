const fs = require('fs');
const axios = require('axios');

const adminf = async (
	username_p,
	moduser_p,
	userstatus_p,
	password_p,
	email_p,
	quota_p,
	data_p,
	source_p
) => {
	if (
		username_p == null &&
		moduser_p == null &&
		userstatus_p == null &&
		password_p == null &&
		email_p == null &&
		quota_p == null &&
		data_p == null &&
		source_p == null
	) {
		console.log(
			'Available options: --newuser --moduser --userstatus --newdata --source'
		);
	} else {
		try {
			const token = fs.readFileSync('./softeng19bAPI.token');
			if (username_p != null) {
				if (moduser_p == null && userstatus_p == null && data_p == null) {
					await axios
						.post(
							'http://localhost:8765/energy/api/Admin/users',
							{
								username: username_p,
								password: password_p,
								email: email_p,
								quota: quota_p
							},
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
					console.log(
						'Please select ONE of the following fuctionalities: --newuser, --moduser, --userstatus, --newdata'
					);
				}
			} else if (moduser_p != null) {
				if (username_p == null && userstatus_p == null && data_p == null) {
					await axios
						.put(
							`http://localhost:8765/energy/api/Admin/users/${moduser_p}`,
							{
								username: moduser_p,
								password: password_p,
								email: email_p,
								quota: quota_p
							},
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
					console.log(
						'Please select ONE of the following fuctionalities: --newuser, --moduser, --userstatus, --newdata'
					);
				}
			} else if (userstatus_p != null) {
				if (username_p == null && moduser_p == null && data_p == null) {
					await axios
						.get(
							`http://localhost:8765/energy/api/Admin/users/${userstatus_p}`,
							{
								headers: {
									'X-OBSERVATORY-AUTH': `Bearer ${token}`
								}
							}
						)
						.then((res) => {
							console.log(res.data[0]);
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
					console.log(
						'Please select ONE of the following fuctionalities: --newuser, --moduser, --userstatus, --newdata'
					);
				}
			}
		} catch {
			console.log('Status code 401: Unauthorized');
		}
	}
};

module.exports = { adminf };

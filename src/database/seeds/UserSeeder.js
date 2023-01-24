var User = require('./../models');
const bcrypt = require('bcryptjs');

var userData = {
	firstname: 'Admin',
	lastname: 'User',
	email: 'info@ekbana.com',
	username: 'admin',
	password: '123admin@',
	role: 'superadmin',
	last_accessed_ip: '110.44.123.47',
	last_accessed_city: 'Kathmandu',
	last_accessed_country: 'Nepal',
	token: '',
	tokenExpires: '',
	image: '',
	status: 'active',
};

User.findOne({ email: userData.email }).then((response) => {
	if (!response) {
		const newUser = new User(userData);
		newUser
			.save()
			.then((savedUser) => {
				// console.log(savedUser);
			})
			.catch((err) => {
				console.log(err);
			});
	}
});

module.exports = {
	isLoggedIn: function (req, res, next) {
		if (req.isAuthenticated() && req.url === '/auth/login') {
			res.redirect('/');
		} else if (
			(!req.isAuthenticated() && req.url === '/auth/login') ||
			req.isAuthenticated()
		) {
			// if user is authenticated in the session, carry on
			next();
		} else if (!req.isAuthenticated()) {
			res.redirect('/auth/login');
		}
	},
};

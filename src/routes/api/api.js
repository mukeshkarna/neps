const passport = require('passport');
const express = require('express');
const router = express.Router();

// const users = require('./clients/users');
const oauth2 = require('./../../auth/oauth2');

require('../../auth/passport-api');

router.post('/oauth2/token', oauth2.token);
router.use('/auth', require('./auth'));

// router.use(
// 	'/users',
// 	passport.authenticate('bearer', { session: false }),
// 	users
// );

module.exports = router;


// // request handlers
// app.get('/api/', (req, res) => {
// 	if (!req.user)
// 		return res
// 			.status(401)
// 			.json({ success: false, message: 'Invalid user to access it.' });
// 	res.send('Welcome to the Node.js Tutorial! - ' + req.user.name);
// });

// import { getCleanUser, generateToken } from '../../helpers/utils';
// validate the user credentials using passport-jwt
// app.post('/api/users/signin', async function (req, res) {
// 	const user = req.body.username;
// 	const pwd = req.body.password;

// 	// return 400 status if username/password is not exist
// 	if (!user || !pwd) {
// 		return res.status(400).json({
// 			error: true,
// 			message: 'Username or Password required.',
// 		});
// 	}

// 	const userData = await Customer.findOne({
// 		customerName: user,
// 	});

// 	if (!userData) {
// 		return res.status(401).json({
// 			error: true,
// 			message: 'Username not found.',
// 		});
// 	}

// 	const checkPassword = await userData.comparePassword(pwd);

// 	// return 401 status if the credential is not match.
// 	if (!checkPassword) {
// 		return res.status(401).json({
// 			error: true,
// 			message: 'Username or Password is Wrong.',
// 		});
// 	}

// 	// generate token
// 	const token = generateToken(userData);
// 	// get basic user details
// 	const userObj = getCleanUser(userData);
// 	// return the token along with user details
// 	return res.json({ user: userObj, token });
// });
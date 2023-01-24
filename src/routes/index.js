const tasks = require('./task');
const role = require('./role');
const user = require('./user');
const permission = require('./permission');
const api = require('./api/api');
const rateLimit = require('express-rate-limit');
const passport = require('passport');
const { authValidator } = require('../validators');

require('../auth/passport-local')(passport);

const { isLoggedIn } = require('../helpers/checkLogin');
const homeController = require('../controller/homeController');
const authController = require('../controller/authController');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = (app, passport) => {
  /**
   * Routes for register
   */

  // Register
  app.get('/auth/register', authController.registerView);
  app.post(
    '/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/dashboard',
      failureRedirect: '/auth/register',
    })
  );

  /**
   * Routes for login
   */

  // Login
  app.get('/auth/login', authController.loginView);
  app.post(
    '/auth/login',
    passport.authenticate('local-signin', {
      successRedirect: '/',
      failureRedirect: '/auth/login',
      failureFlash: true,
    })
  );

  /**
   * Routes which is used after logged in
   */

  // Dashboard
  app.get('/', isLoggedIn, homeController.index);

  // Tasks
  app.use('/tasks', isLoggedIn, tasks);

  // Roles
  app.use('/roles', isLoggedIn, role);

  // Permissions
  app.use('/permissions', isLoggedIn, permission);

  // Users
  app.use('/users', isLoggedIn, user);

  // Logout
  app.get('/logout', authController.logout);

  /**
   * Routes for API
   */
  // API
  app.use('/api/v1', api);

  /**
   * Routes for handling errors
   */
  // 403 error
  app.get('/403', function (req, res) {
    res.render('errors/error-403', {
      layout: false,
    });
  });

  // 500 error
  app.get('/500', function (req, res) {
    res.render('errors/error-500', {
      layout: false,
    });
  });

  // 404 error
  app.get('*', function (req, res) {
    res.render('errors/error-404', {
      layout: false,
    });
  });
};

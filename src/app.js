const path = require('path');
const morgan = require('morgan');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const expressValidator = require('express-validator');

const { check, validationResult } = require('express-validator');

let expressLoader = {};
const flash = require('connect-flash');
const session = require('express-session');

expressLoader.init = async app => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(flash());

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 1000 * 60 * 60 * 24 },
    })
  );

  app.use(methodOverride('_method'));
  app.use(express.static(path.join(__dirname, 'public')));
  // app.set('files', path.join(__dirname, 'public/files'));
  app.set('views', path.join(__dirname, 'views'));

  app.use(expressLayouts);
  app.set('layout', './layouts/index');
  app.set('view engine', 'ejs');

  app.use(morgan('dev'));

  app.use(async (req, res, next) => {
    res.locals['error_msg'] = req.flash('error_msg');
    res.locals.inputData = req.flash('inputData')[0];
    res.locals['error_arr'] = req.flash('error_arr');
    res.locals['success_msg'] = req.flash('success_msg');
    res.locals['error_excel'] = req.flash('error_excel');
    res.locals.errors = req.flash('errors');
    res.locals.query = req.query;
    res.locals.url = req.url;
    res.locals.session = req.session;
    res.locals.modulePermissions =
      req.user && req.user.permissions ? req.user.permissions : [];
    next();
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  //Models
  var models = require('./models');
  //Routes
  require('./routes')(app, passport);

  //load passport strategies
  require('./auth/passport-local')(passport, models.superuser);

  return app;
};

module.exports = expressLoader;

// Define stategy local ie using our own database
var bcrypt = require('bcrypt');

const LocalStrategy = require('passport-local').Strategy;
const { getPermission } = require('../helpers/getPermission');

// Load SuperUser model
var db = require('../models');

module.exports = function (passport, user) {
  // Telling passport we want to use a Local Strategy. In other words,
  //we want login with a username/email and password
  var SuperUser = user;

  //LOCAL SIGNUP
  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },
      function (req, email, password, done) {
        var generateHash = function (password) {
          return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        };
        db.SuperUser.findOne({
          where: {
            email: email,
          },
        }).then(function (user) {
          if (user) {
            return done(null, false, {
              message: 'That email is already taken',
            });
          } else {
            var userPassword = generateHash(password);
            var data = {
              firstName: req.body.fname,
              lastName: req.body.lname,
              userName: req.body.username,
              email: req.body.email,
              password: userPassword,
            };

            SuperUser.create(data).then(function (newUser, created) {
              if (!newUser) {
                return done(null, false);
              }

              if (newUser) {
                return done(null, newUser);
              }
            });
          }
        });
      }
    )
  );

  //LOCAL SIGNIN
  passport.use(
    'local-signin',
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },

      function (req, email, password, done) {
        var isValidPassword = function (userpass, password) {
          return bcrypt.compareSync(password, userpass);
        };

        db.SuperUser.findOne({
          where: {
            email: email,
          },
        })
          .then(function (user) {
            if (!user) {
              return done(null, false, {
                message: 'Email does not exist',
              });
            }

            if (!isValidPassword(user.password, password)) {
              return done(null, false, {
                message: 'Authentication failed. Wrong password.',
              });
            }

            var userinfo = user.get();
            return done(null, userinfo);
          })
          .catch(function (err) {
            console.log('Error:', err);
            return done(null, false, {
              message: 'Something went wrong with your Sign in',
            });
          });
      }
    )
  );

  //serialize
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // deserialize user
  passport.deserializeUser(function (id, done) {
    db.SuperUser.findByPk(id).then(function (user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });
};

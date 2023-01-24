const { isEmpty } = require('lodash');
const moment = require('moment');
let { Op } = require('sequelize');
const passport = require('passport');
const { layouts } = require('../config/configure');

let authController = {
  registerView: async (req, res) => {
    try {
      res.render('auth/auth-register', layouts.other);
    } catch (error) {
      req.flash('error_msg', 'something went wrong');
    }
  },

  forgotView: async (req, res) => {
    try {
      res.render('auth/forgot-password', layouts.other);
    } catch (error) {
      req.flash('error_msg', 'something went wrong');
    }
  },

  forgotPassword: async (req, res, next) => {
    try {
      const user = User.findOne({ where: { email: req.body.email } });

      if (!user) {
        req.flash('error', 'No account with that email address exists.');
        return res.redirect('/auth/forgot');
      } else {
        const token = randtoken.generate(24);
        const expiryTime = Date.now() + 3600000;

        user.token = token;
        user.tokenExpires = expiryTime;
        user.save().then(userData => {
          var hostname = 'http://' + req.headers.host;
          var forgotPasswordLink = hostname + '/reset/' + token;
          var forgotCode = 'forgot_password';
        });
      }
      // Email.findOne({ code: forgotCode })
      //   .then(emailData => {
      //     // emailAttribute
      //     var emailAttribute = {};
      //     emailAttribute.url = forgotPasswordLink;
      //     emailAttribute.forgotCode = forgotCode;
      //     emailAttribute.subject = emailData.subject;
      //     emailAttribute.user = user;
      //     emailAttribute.body = emailData.body;

      //     if (!emailData) {
      //       req.flash('error', 'Code is not correct for forgot password');
      //       return res.redirect('/forgot');
      //     } else {
      //       var emailBody = emailData.body;
      //       var emailSubject = emailData.subject;
      //       sendEmail.sendEmail(emailAttribute, function (error, body) {
      //         if (error) {
      //           req.flash(
      //             'error_msg',
      //             'Email Cannot be sent.Please check the configuration of email'
      //           );
      //           return res.redirect('/forgot');
      //         } else {
      //           req.flash(
      //             'success_msg',
      //             'Please check your email to reset password.'
      //           );
      //           res.redirect('/forgot');
      //         }
      //       });
      //     }
      //   })
      //   .catch(() => {
      //     req.flash('error', 'Something went wrong.');
      //     return res.redirect('/forgot');
      //   });
    } catch (error) {
      req.flash('error_msg', 'something went wrong');
    }
  },

  loginView: async (req, res) => {
    try {
      res.render('auth/auth-login', layouts.other);
    } catch (error) {
      req.flash('error_msg', 'something went wrong');
    }
  },

  logout: function (req, res) {
    req.session.destroy(function (err) {
      res.redirect('/');
    });
  },
};

module.exports = authController;

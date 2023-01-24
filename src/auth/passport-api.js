// Load required packages
const config = require('../config/configure');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const ClientPasswordStrategy =
  require('passport-oauth2-client-password').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const { Client, AccessToken, User } = require('../models');

passport.use(
  new BasicStrategy(async (username, password, done) => {
    try {
      const client = await Client.findOne({
        where: { clientId: username },
      });

      if (!client) {
        return done(null, false);
      }
      if (client.clientSecret !== password) {
        return done(null, false);
      }

      return done(null, client);
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(
  new ClientPasswordStrategy(async (clientId, clientSecret, done) => {
    try {
      const client = await Client.findOne({
        where: { clientId: clientId },
      });

      if (!client) {
        return done(null, false);
      }

      if (client.clientSecret !== clientSecret) {
        return done(null, false);
      }

      return done(null, client);
    } catch (error) {
      return done(err);
    }
  })
);

passport.use(
  new BearerStrategy(async (accessToken, done) => {
    try {
      const token = await AccessToken.findOne({
        where: { token: accessToken },
      });
      if (!token) {
        return done(null, false);
      }

      if (
        Math.round((Date.now() - token.created) / 1000) >
        config.security.tokenLife
      ) {
        await AccessToken.destroy({ where: { token: accessToken } });
        return done(null, false, { message: 'Token expired' });
      }
      const info = { scope: '*' };

      const user = User.findByPk(token.userId);
      if (user) return done(null, user, info);

      return done(null, false, { message: 'Unknown user' });
    } catch (error) {
      return done(err);
    }
  })
);

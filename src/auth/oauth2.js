// Load required packages

const passport = require('passport');

const config = require('../config/configure');

const oauth2orize = require('oauth2orize');
const { RefreshToken, AccessToken, User } = require('../models');
const bcrypt = require('bcrypt');

// create OAuth 2.0 server
const server = oauth2orize.createServer();

// Exchange username & password for an access token.
server.exchange(
  oauth2orize.exchange.password(async function (
    client,
    username,
    password,
    scope,
    done
  ) {
    try {
      let user = await User.findOne({ email: username });

      if (!user) {
        return done(null, false);
      }

      //Match password
      return bcrypt.compare(
        password,
        user.password,
        async function (err, isMatch) {
          if (isMatch === true) {
            if (user.status == '0') {
              return done({
                message: 'User is inactive',
                status: 402,
              });
            }

            try {
              await RefreshToken.destroy({
                where: {
                  userId: user.id,
                  clientId: client.clientId,
                },
              });

              await AccessToken.destroy({
                where: {
                  userId: user.id,
                  clientId: client.clientId,
                },
              });

              const tokenValue = uid(config.security.tokenLength);
              const userId = user.id;
              const refreshTokenValue = uid(config.security.tokenLength);

              // Saving refresh token
              const refreshToken = await RefreshToken.create({
                token: refreshTokenValue,
                clientId: client.clientId,
                userId: userId,
              });

              const token = await AccessToken.create({
                token: tokenValue,
                clientId: client.clientId,
                userId: userId,
              });
              done(null, tokenValue, refreshTokenValue, {
                expires_in: config.security.tokenLife,
              });
            } catch (error) {
              return done(error);
            }
          } else {
            return done();
          }
        }
      );
    } catch (error) {
      return done(error);
    }
  })
);

// Exchange refreshToken for an access token.
server.exchange(
  oauth2orize.exchange.refreshToken(async function (
    client,
    refresh_Token,
    scope,
    done
  ) {
    try {
      let token = await RefreshToken.findOne({
        where: { token: refresh_Token },
      });

      if (!token) {
        return done(null, false);
      }
      if (!token) {
        return done(null, false);
      }

      let user = await User.findByPk(token.userId);

      if (!user) {
        return done(null, false);
      }

      await RefreshToken.destroy({
        where: {
          userId: user.id,
          clientId: client.clientId,
        },
      });

      await AccessToken.destroy({
        where: {
          userId: user.id,
          clientId: client.clientId,
        },
      });

      const tokenValue = uid(config.security.tokenLength);
      const userId = user.id;
      const refreshTokenValue = uid(config.security.tokenLength);

      const refreshToken = await RefreshToken.create({
        token: refreshTokenValue,
        clientId: client.clientId,
        userId: userId,
      });

      var info = { scope: '*' };
      token = await AccessToken.create({
        token: tokenValue,
        clientId: client.clientId,
        userId: userId,
      });

      done(null, tokenValue, refreshTokenValue, {
        expires_in: config.security.tokenLife,
      });
    } catch (error) {
      console.log(error);
      return done(error);
    }
  })
);

// token endpoint
exports.token = [
  passport.authenticate(['basic', 'oauth2-client-password'], {
    session: false,
  }),
  server.token(),
  server.errorHandler(),
];

function uid(len) {
  var buf = [],
    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    charlen = chars.length;

  for (var i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

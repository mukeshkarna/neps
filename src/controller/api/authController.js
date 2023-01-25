const { isEmpty } = require('lodash');
let { Op } = require('sequelize');
const passport = require('passport');

const bcrypt = require('bcrypt');

const OAuthTokensModel = require('../../models').OAuthTokens;
const OAuthClientsModel = require('../../models').OAuthClients;
const OAuthUsersModel = require('../../models').OAuthUsers;

let apiAuthController = {
  /**
   * Invoked to retrieve an existing access token previously saved through Model#saveToken().
   *
   * @param {String} accessToken The access token to retrieve.
   */
  getAccessToken: function (bearerToken) {
    return OAuthTokensModel.findOne({
      where: {
        accessToken: bearerToken,
      },
      include: [
        {
          model: OAuthClientsModel,
          as: 'client',
        },
        {
          model: OAuthUsersModel,
          as: 'user',
        },
      ],
    })
      .then(token => {
        const data = new Object();
        for (const prop in token.get()) data[prop] = token[prop];
        data.client = data.client.get();
        data.user = data.user.get();
        return data;
      })
      .catch(error => console.error(error));
  },

  /**
   * Invoked to retrieve a client using a client id or a client
   * id/client secret combination, depending on the grant type.
   *
   * @param {*} clientId      The client id of the client to retrieve.
   * @param {*} clientSecret  The client secret of the client to retrieve. Can be null.
   */
  getClient: function (clientId, clientSecret) {
    return OAuthClientsModel.findOne({
      where: { clientId: clientId, clientSecret: clientSecret },
      raw: true,
    });
  },

  /**
   * Invoked to retrieve an existing refresh token previously saved through Model#saveToken().
   *
   * @param {String} refreshToken The access token to retrieve.
   * @returns {Object} An Object representing the refresh token and associated data.
   */
  getRefreshToken: function (refreshToken) {
    return OAuthTokensModel.findOne({
      where: {
        refreshToken: refreshToken,
      },
      include: [
        {
          model: OAuthClientsModel,
          as: 'client',
        },
        {
          model: OAuthUsersModel,
          as: 'user',
        },
      ],
    })
      .then(token => {
        const data = new Object();
        for (const prop in token.get()) data[prop] = token[prop];
        data.client = data.client.get();
        data.user = data.user.get();
        return data;
      })
      .catch(error => console.error(error));
  },

  /**
   * Invoked to retrieve a user using a username/password combination.
   *
   * @param {*} username
   * @param {*} password
   *
   * @returns An Object representing the user, or a falsy value if no such user could
   *          be found. The user object is completely transparent to oauth2-server and is
   *          simply used as input to other model functions.
   */
  getUser: function (username, password) {
    return OAuthUsersModel.findOne({ where: { email: username } }).then(
      user => {
        const isMatch = bcrypt.compareSync(password, user.get().password);
        if (isMatch) {
          return user.get();
        } else {
          console.error('Password not match');
        }
      }
    );
  },

  /**
   * Invoked to save an access token and optionally a refresh token,
   * depending on the grant type.
   *
   * @param {Object} token The token(s) to be saved.
   * @param {String} token.accessToken The access token to be saved.
   * @param {Date} token.accessTokenExpiresAt The expiry time of the access token.
   * @param {String} token.refreshToken The refresh token to be saved.
   * @param {Date} token.refreshTokenExpiresAt The expiry time of the refresh token.
   * @param {String} token.scope The authorized scope of the token(s).
   *
   * @param {Object} client The client associated with the token(s).
   * @param {Object} user The user associated with the token(s).
   */
  saveToken: function (token, client, user) {
    return OAuthTokensModel.create({
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      clientId: client.id,
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      userId: user.id,
    })
      .then(token => {
        const data = new Object();
        for (const prop in token.get()) data[prop] = token[prop];
        data.client = data.clientId;
        data.user = data.userId;

        return data;
      })
      .catch(error => console.error(error));
  },

  /**
   * Invoked to revoke a refresh token.
   *
   * @param {Object} token The token to be revoked.
   * @param {String} token.refreshToken The refresh token.
   * @param {Date}   token.refreshTokenExpiresAt The expiry time of the refresh token.
   * @param {String} token.scope The authorized scope of the refresh token.
   * @param {Object} token.client The client associated with the refresh token.
   * @param {String} token.client.id A unique string identifying the client.
   * @param {Object} token.user The user associated with the refresh token.
   * @returns {Boolean} Return true if the revocation was successful or false if the refresh token could not be found.
   */
  revokeToken: function (token) {
    return OAuthTokensModel.findOne({
      where: { refreshToken: token.refreshToken },
    })
      .then(refreshToken => {
        console.log(refreshToken);
        return refreshToken
          .destroy()
          .then(() => {
            return !!refreshToken;
          })
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
  },

  setClient: function (client) {
    return OAuthClientsModel.create({
      clientId: client.clientId,
      clientSecret: client.clientSecret,
      redirectUris: client.redirectUris,
      grants: client.grants,
    })
      .then(client => {
        client = client && typeof client == 'object' ? client.toJSON() : client;
        const data = new Object();
        for (const prop in client) data[prop] = client[prop];
        data.client = data.clientId;
        data.grants = data.grants;

        return data;
      })
      .catch(error => console.error(error));
  },

  setUser: function (user) {
    return OAuthUsersModel.create({
      username: user.username,
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      prefix: user.prefix,
    })
      .then(userResult => {
        userResult =
          userResult && typeof userResult == 'object'
            ? userResult.toJSON()
            : userResult;
        const data = new Object();
        for (const prop in userResult) data[prop] = userResult[prop];
        data.username = data.username;
        data.name = data.name;

        return data;
      })
      .catch(error => console.error(error));
  },
};
module.exports = apiAuthController;

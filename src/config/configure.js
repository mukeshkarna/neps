const dotenv = require('dotenv').config({ path: './.env' });

let config = {};

/**
 * Application environment
 */
config.app_env = process.env.APP_ENV || 'development';
config.app_url = process.env.APP_URL || 'http://localhost:8000';

/**
 * Database Configuration
 */

// MAilgun
config.mailConfig = {};
config.mailConfig.mailEmail = process.env.MAIL_EMAIL;
config.mailConfig.mailgunApiKey = process.env.MAIL_API_KEY;
config.mailConfig.mailgunDomain = process.env.MAIL_API_DOMAIN;

// Throttling
config.throttle = {};
config.throttle.freeTries = process.env.FREE_TRIES || 5;
config.throttle.waitTime = process.env.WAIT_TIME_IN_SEC || 60;

// Oauth 2
config.security = {};
config.security.tokenLife = process.env.EXPIRY_TIME || 3600;
config.security.tokenLength = 400;

// Session
config.session = {
  // Session age in seconds
  age: process.env.SESSION_AGE || 3600,
};

/**
 * Configure layout
 */
config.layouts = {
  main: {
    layout: './layouts/index',
  },
  other: {
    layout: false,
  },
};

// Redis lab credentials
config.redis = {
  port: process.env.REDIS_PORT || '',
  host: process.env.REDIS_HOST || '',
  secret: process.env.REDIS_PASSWORD || '',
};

// Frontend Domains
config.domains = {
  user: process.env.USER_DOMAIN || '',
};

config.clientUrl = process.env.CLIENT_URL || 'http://localhost:8080/#';

module.exports = config;

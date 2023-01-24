const dotenv = require('dotenv').config({ path: './.env' });

let config = {};

// number of day for data accessible to othe companies
config.days = process.env.days || 7;
config.extra_days = process.env.extra_days || 23;
config.new_sharing_days =
  parseInt(process.env.new_sharing_days) || parseInt(21);
config.utcOffset = process.env.utcOffset || '+0545';
config.ipAddressCheck = process.env.ipAddressCheck || false;

/**
 * Application environment
 */
config.app_env = process.env.APP_ENV || 'development';
config.app_url = process.env.APP_URL || 'http://localhost:8000';

/**
 * Database Configuration
 */

config.mongodb = {};
config.mongodb.url = process.env.MONGODB_URL || 'localhost';

// MAilgun
config.mailConfig = {};
config.mailConfig.mailEmail = process.env.MAIL_EMAIL || 'info@ekbana.com';
config.mailConfig.mailgunApiKey =
  process.env.MAIL_API_KEY || 'key-1ef6798c429cc36cba3c2f427a4ac929';
config.mailConfig.mailgunDomain =
  process.env.MAIL_API_DOMAIN || 'mh.ekbana.net';

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

// Swagger base url
config.swagger = {};
config.swagger.baseUrl = process.env.SWAGGER_URL || 'localhost:3000';

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

config.company_url = process.env.COMPANY_URL || 'http://localhost:8080/#/';
config.job_seeker_url =
  process.env.JOB_SEEKER_URL || 'http://localhost:8080/#/';
config.clientUrl = process.env.CLIENT_URL || 'http://localhost:8080/#';

config.reportApiKey =
  process.env.REPORT_API_KEY || '0h32p43uNp2gRBa8EEUllVadljLPcWq';

module.exports = config;

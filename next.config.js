// next.config.js
const withCSS = require('@zeit/next-css');
require('dotenv').config();

module.exports = withCSS({
  target: 'serverless',
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    MONGO: process.env.MONGO,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_API_KEY_DEV: process.env.FIREBASE_API_KEY_DEV,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_APP_ID_DEV: process.env.FIREBASE_APP_ID_DEV,
    STRIPE_CLIENT_DEV: process.env.STRIPE_CLIENT_DEV,
    STRIPE_SECRET_DEV: process.env.STRIPE_SECRET_DEV,
    STRIPE_CLIENT_PROD: process.env.STRIPE_CLIENT_PROD,
    STRIPE_SECRET_PROD: process.env.STRIPE_SECRET_PROD,
    ENV: process.env.ENV,
  },
});

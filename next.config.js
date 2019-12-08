// next.config.js
const withCSS = require('@zeit/next-css');
require('dotenv').config();

module.exports = withCSS({
  target: 'serverless',
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    MONGO: process.env.MONGO,
  },
});

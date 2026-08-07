require('dotenv').config();

const isTesting =
  process.env.TESTING === 'true' || process.env.NODE_ENV === 'test';

const DATABASE_URL = isTesting
  ? process.env.TEST_DATABASE_URL
  : process.env.DATABASE_URL;

module.exports = {
  DATABASE_URL: DATABASE_URL,
  PORT: process.env.PORT || 3070,
  SECRET: process.env.SECRET,
};

const Sequelize = require('sequelize');
const { DATABASE_URL } = require('./config');
const logger = require('./logger');

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    logger.info('connected to the database');
  } catch (err) {
    logger.error('failed to connect to the database', error.message);
    return process.exit(1);
  }

  return null;
};

module.exports = { connectToDatabase, sequelize };

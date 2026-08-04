const app = require('./app');
const config = require('./utils/config');
const logger = require('./utils/logger');

const { PORT } = require('./utils/config');
const { connectToDatabase } = require('./utils/db');

const start = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Error connecting to Sequelize:', error.message);
    process.exit(1);
  }
};

start();

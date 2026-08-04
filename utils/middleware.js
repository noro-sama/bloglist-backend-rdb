const logger = require('./logger');
// const jwt = require('jsonwebtoken');
const { Blog } = require('../models');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  if (!req.blog) {
    return res.status(404).end();
  }
  next();
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.type === 'entity.parse.failed') {
    return response.status(400).json({
      error: 'Malformed JSON',
    });
  }

  if (
    error.name === 'SequelizeValidationError' ||
    error.name === 'ValidationError'
  ) {
    const errors = error.errors.map((err) => err.message).join(', ');
    return response.status(400).json({
      error: errors,
    });
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    const field = error.errors ? error.errors[0].path : 'unknown field';
    return response.status(400).json({
      error: `Expected \`${field}\` to be unique`,
    });
  }

  if (error.name === 'SequelizeForeignKeyConstraintError') {
    return response.status(400).json({
      error: 'Referential integrity error: Parent record not found',
    });
  }

  if (error.name === 'SequelizeInvalidRelationalQuery') {
    return response.status(400).json({
      error: 'Invalid relational query',
    });
  }

  // 6. Handle JWT Errors
  // if (error.name === 'JsonWebTokenError') {
  //   return response.status(401).json({
  //     error: 'Token invalid'
  //   });
  // }

  // if (error.name === 'TokenExpiredError') {
  //   return response.status(401).json({
  //     error: 'Token expired'
  //   });
  // }

  if (!error.status) {
    error.status = 500;
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  blogFinder,
  errorHandler,
};

const express = require('express');
const app = express();
const middleware = require('./utils/middleware');

const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const authorsRouter = require('./controllers/authors');
const homeRouter = require('./controllers/home');
const resetRouter = require('./controllers/reset');

app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/authors', authorsRouter);
app.use('/', homeRouter);
app.use('/api/reset', resetRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

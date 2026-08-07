const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Blog } = require('../models');
const { fn, col } = require('sequelize');

router.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    group: ['author'],
    attributes: [
      'author',
      [fn('SUM', col('likes')), 'likes'],
      [fn('COUNT', col('title')), 'blogs'],
    ],
    order: [['likes', 'DESC']],
    raw: true,
  });
  res.json(authors);
});

module.exports = router;

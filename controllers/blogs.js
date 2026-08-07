const { Blog, User } = require('../models');
const { sequelize } = require('../utils/db');
const router = require('express').Router();
const { Op, literal } = require('sequelize');
const { tokenExtractor, blogFinder } = require('../utils/middleware');

router.get('/', async (req, res) => {
  let where = {};
  if (req.query.search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `${req.query.search}%`,
          },
        },
        {
          author: {
            [Op.iLike]: `${req.query.search}%`,
          },
        },
      ],
    };
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
    order: [['likes', 'DESC']],
    where,
  });

  console.log(JSON.stringify(blogs));
  res.json(blogs);
});

router.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({ ...req.body, userId: user.id });
    return res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get('/:id', blogFinder, async (req, res) => {
  res.json(req.blog);
});

router.put('/:id', tokenExtractor, async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  const user = await User.findByPk(req.decodedToken.id);
  if (!blog) {
    return res.status(404).end();
  }
  if (blog.userId === user.id) {
    const updatedBlog = await blog.update({
      author: blog.author,
      likes: req.body.likes,
      title: blog.title,
      url: blog.url,
    });

    res.json(updatedBlog);
  } else {
    return res.status(401).end();
  }
});

router.delete('/:id', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.findByPk(req.params.id);
  if (!blog) {
    return res.status(404).end();
  }

  if (blog.userId === user.id) {
    await blog.destroy();
    res.status(204).end();
  } else {
    return res.status(401).end();
  }
});

module.exports = router;

const { Blog, User } = require('../models');
const router = require('express').Router();
const { tokenExtractor, blogFinder } = require('../utils/middleware');

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
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
  if (blog.user === { name: user.name }) {
    const updatedBlog = await blog.update({
      author: req.body.author,
      likes: req.body.likes,
      title: req.body.title,
      url: req.body.url,
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

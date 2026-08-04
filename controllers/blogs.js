const { Blog } = require('../models');
const router = require('express').Router();
const middleware = require('../utils/middleware');

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll();

  console.log(JSON.stringify(blogs));
  res.json(blogs);
});

router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const blog = await Blog.create({ ...req.body });
    return res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get('/:id', middleware.blogFinder, async (req, res) => {
  res.json(req.blog);
});

router.put('/:id', middleware.blogFinder, async (req, res) => {
  const updatedBlog = await req.blog.update({
    author: req.body.author,
    likes: req.body.likes,
    title: req.body.title,
    url: req.body.url,
  });

  res.json(updatedBlog);
});

router.delete('/:id', middleware.blogFinder, async (req, res) => {
  await req.blog.destroy();
  res.status(204).end();
});

module.exports = router;

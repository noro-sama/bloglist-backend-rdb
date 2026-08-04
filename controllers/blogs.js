const { Blog } = require('../models');
const router = require('express').Router();

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

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  if (!req.blog) {
    return res.status(404).end();
  }
  next();
};

router.get('/:id', blogFinder, async (req, res) => {
  res.json(req.blog);
});

router.put('/:id', blogFinder, async (req, res) => {
  const updatedBlog = await req.blog.update({
    author: req.body.author,
    likes: req.body.likes,
    title: req.body.title,
    url: req.body.url,
  });

  res.json(updatedBlog);
});

router.delete('/:id', blogFinder, async (req, res) => {
  await req.blog.destroy();
  res.status(204).end();
});

module.exports = router;

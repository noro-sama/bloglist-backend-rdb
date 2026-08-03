require('dotenv').config();
const Blog = require('./models/blog');
const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll();

  console.log(JSON.stringify(blogs));
  res.json(blogs);
});

app.post('/api/blogs', async (req, res) => {
  try {
    console.log(req.body);
    const blog = await Blog.create({ ...req.body, date: new Date() });
    return res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

app.get('/api/blogs/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    console.log(blog.toJSON());
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

app.put('/api/blogs/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    blog.important = req.body.important;
    await blog.save();
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    await blog.destroy();
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3070;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

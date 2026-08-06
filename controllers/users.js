const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Blog } = require('../models');

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: {
        exclude: ['userId'],
      },
    },
  });
  res.json(users);
});

router.post('/', async (req, res) => {
  try {
    const { username, name, password } = req.body;

    const saltRounds = 10;
    if (password.length < 4) {
      response.status(400).json('Password must be more than 3 characters long');
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({ username, name, hashedPassword });
    res.json(user);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.put('/:username', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username,
      },
    });

    const updatedUser = await user.update({ username: req.body.username });
    res.json(updatedUser);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

module.exports = router;

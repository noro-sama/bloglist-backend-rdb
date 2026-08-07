const router = require('express').Router();
const { User, Blog } = require('../models');

router.post('/', async (req, res) => {
  try {
    await Blog.destroy({ truncate: true, cascade: true });
    await User.destroy({ truncate: true, cascade: true });
    res.status(200).json({ message: 'Database cleared successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'Failed to clear database', details: error.message });
  }
});

module.exports = router;

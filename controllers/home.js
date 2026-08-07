const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    console.log('Hey there');
    res.status(200).json({ message: 'Welcome to The Bloglist' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'Failed to clear database', details: error.message });
  }
});

module.exports = router;

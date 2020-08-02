const express = require('express');

const router = express.Router();

router.get('/health-check', (req, res) => {
  res.send({ message: 'The server is up and running!' });
});

module.exports = router;

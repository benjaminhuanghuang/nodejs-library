const express = require('express');
const router = express.Router();

// Test page
router.get('/testing', (req, res) => {
  //res.send('Hey! It works!');
  res.render('index', {
    title: 'Home Page'
  });
});

module.exports = router;
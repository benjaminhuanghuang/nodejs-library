const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  //res.send('Hey! It works!');
   res.render('index', { title: 'Home Page'});
});

module.exports = router;

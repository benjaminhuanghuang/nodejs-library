const express = require('express');
const router = express.Router();

// App controllers
const entityController = require('../controllers/entityController');

router.get('/', (req, res) => {
  //res.send('Hey! It works!');
   res.render('index', { title: 'Home Page'});
});

// Add entity
router.get('/add-entity', entityController.addEntity);
router.post('/add-entity', entityController.createEntity);


module.exports = router;

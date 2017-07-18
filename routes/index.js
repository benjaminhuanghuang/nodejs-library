const express = require('express');
const router = express.Router();

// App controllers
const entityController = require('../controllers/entityController');

// Homepage
router.get('/testing', (req, res) => {
  //res.send('Hey! It works!');
   res.render('index', { title: 'Home Page'});
});

// Homepage
router.get('/', entityController.getEntities);
router.get('/entities', entityController.getEntities);

// Add entity
router.get('/add-entity', entityController.addEntity);
router.post('/add-entity', entityController.createEntity);


module.exports = router;

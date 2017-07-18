const express = require('express');
const router = express.Router();

// App controllers
const entityController = require('../controllers/entityController');

// Homepage
router.get('/testing', (req, res) => {
  //res.send('Hey! It works!');
  res.render('index', {
    title: 'Home Page'
  });
});

// Homepage
router.get('/', entityController.getEntities);
router.get('/entities', entityController.getEntities);

// Add entity
router.get('/entities/add', entityController.addEntity);
router.post('/entities/add',
  entityController.upload,
  entityController.resize,
  entityController.createEntity);

// Edit
router.get('/entities/edit/:id', entityController.getEntityForEditing);
// To use same from for adding and editing, we ues same URL for those operation
router.post('/entities/add/:id',
  entityController.upload,
  entityController.resize,
  entityController.updateEntity);

module.exports = router;
const express = require('express');
const contentRoutes = express.Router();

// App controllers
const entityController = require('../controllers/entityController');

// Homepage
contentRoutes.get('/', entityController.getEntities);
contentRoutes.get('/entities', entityController.getEntities);

// Add entity
contentRoutes.get('/entities/add', entityController.addEntity);
contentRoutes.post('/entities/add',
  entityController.upload,
  entityController.resize,
  entityController.createEntity);

// Edit
contentRoutes.get('/entities/edit/:id', entityController.getEntityForEditing);
// To use same from for adding and editing, we ues same URL for those operation
contentRoutes.post('/entities/add/:id',
  entityController.upload,
  entityController.resize,
  entityController.updateEntity);


// Display single entity and reviews
contentRoutes.get('/entities/:slug', entityController.getEntityBySlug);

module.exports = contentRoutes;
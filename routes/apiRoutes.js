const express = require('express');
const apiRoutes = express.Router();

// Import app controllers
const entityController = require('../controllers/entityController');

// Add or remove entity to user's favorites
apiRoutes.post('/entities/favorite/:id', entityController.addOrRemoveFavorite);

module.exports = apiRoutes;
const express = require('express');
const apiRoutes = express.Router();
const {
    catchErrors
} = require('../handlers/errorHandlers');

// Import app controllers
const entityController = require('../controllers/entityController');

// Add or remove entity to user's favorites
apiRoutes.post('/entities/favorite/:id', catchErrors(entityController.addOrRemoveFavorite));

module.exports = apiRoutes;
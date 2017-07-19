const express = require('express');
const userRoutes = express.Router();

// App controllers
const userController = require('../controllers/userController');
// const authController = require('../controllers/authController');

// Login
userRoutes.get('/login', userController.loginForm);


module.exports = userRoutes;
const express = require('express');
const userRoutes = express.Router();

// Import app controllers
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// Register
userRoutes.get('/register', userController.registerForm);
// 1. validate register data
// 2. register user
// 3. log in user
userRoutes.post('/register',
    userController.validateRegister,
    userController.register,
    authController.login);


// Login
userRoutes.get('/login', userController.loginForm);
userRoutes.post('/login', authController.login);

// logout
userRoutes.get('/logout', authController.logout);


module.exports = userRoutes;
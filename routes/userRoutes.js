const express = require('express');
const userRoutes = express.Router();

// Import app controllers
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const {
    catchErrors
} = require('../handlers/errorHandlers');

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

// reset password
userRoutes.post('/account/forgot', authController.generateRestToken); //generate reset token
userRoutes.get('/account/reset/:token', authController.reset); // show reset form
userRoutes.post('/account/reset/:token',
    authController.confirmedPasswords,
    authController.updatePassword);

module.exports = userRoutes;
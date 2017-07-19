const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.loginForm = (req, res) => {
    res.render('login', {
        title: 'User Login'
    });
}

exports.registerForm = (req, res) => {
    res.render('register', {
        title: 'Register'
    });
}


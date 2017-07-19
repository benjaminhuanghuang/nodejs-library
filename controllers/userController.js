const mongoose = require('mongoose');
const User = mongoose.model('User');

// Get Register form
exports.registerForm = (req, res) => {
    res.render('register', {
        title: 'Register'
    });
}

exports.register = async(req, res, next) => {
    const user = new User({
        email: req.body.email,
        name: req.body.name
    });
    const register = promisify(User.register, User);
    await register(user, req.body.password);
    // res.send('it works');
    next();
}


// GET login form
exports.loginForm = (req, res) => {
    res.render('login', {
        title: 'User Login'
    });
}


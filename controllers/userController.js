const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

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
    // register method was provided by passportLocalMongoose middleware
    // the function use callback
    // User.register(user, req,body.password, function(err, user){})
    // promisify(function, object bind to the function) can covert it to a promise
    const register = promisify(User.register, User);
    await register(user, req.body.password);
    // res.send('it works');
    next();
}

exports.validateRegister = (req, res, next) => {
    req.sanitizeBody('name');
    req.checkBody('name', 'You must supply a name!').notEmpty();
    req.checkBody('email', 'That Email is not valid!').isEmail();
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false
    });
    req.checkBody('password', 'Password cannot be blank!').notEmpty();
    req.checkBody('password-confirm', 'Confirmed Password cannot be blank!').notEmpty();
    req.checkBody('password-confirm', 'Your passwords do not match!').equals(req.body.password);

    const errs = req.getValidationResult();

    if (errs) {
        req.flash('error', errs.map(err => err.msg));
        res.render('register', {
            title: 'Register',
            body: req.body,
            flashes: req.flash()
        });
        return;
    }
    next();
}


// GET login form
exports.loginForm = (req, res) => {
    res.render('login', {
        title: 'User Login'
    });
}


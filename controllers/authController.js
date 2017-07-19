const passport = require('passport');
const promisify = require('es6-promisify');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const mail = require('../handlers/mail');

// user the function in passport
// Config passport in handlers/passport.js
exports.login = passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Failed Login!',
    successRedirect: '/',
    successFlash: 'You are now logged in!'
});

exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'You are now logged out!');
    res.redirect('/');
}

exports.generateRestToken = async(req, res) => {
    // 1. See if a user with that email exists
    const user = await User.findOne({
        email: req.body.email
    });
    if (!user) {
        req.flash('error', 'No account with that email exists.');
        return res.redirect('/login');
    }

    // 2. Set reset tokens and expiry on their account
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
    await user.save();

    // 3. Send them an email with the token
    const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
    //req.flash('success', `You have been emailed a password reset link. ${resetURL}`);
    await mail.send({
        user,
        filename: 'password-reset',
        subject: 'Password Reset',
        resetURL
    });
    req.flash('success', `You have been emailed a password reset link.`);
    // 4. redirect to login page
    res.redirect('/login');
};

// Show the reset password form
exports.reset = async(req, res) => {
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {
            $gt: Date.now()
        }
    });
    if (!user) {
        req.flash('error', 'Password reset is invalid or has expired');
        return res.redirect('/login');
    }
    // if there is a user, show the rest password form
    res.render('reset', {
        title: 'Reset your Password'
    });
};


// check the password when reset pwd
exports.confirmedPasswords = (req, res, next) => {
    // can not use req.body.password-confirm
    if (req.body.password === req.body['password-confirm']) {
        next(); // keepit going!
        return;
    }
    req.flash('error', 'Passwords do not match!');
    res.redirect('back');
};


exports.updatePassword = async(req, res) => {
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {
            $gt: Date.now()
        }
    });

    if (!user) {
        req.flash('error', 'Password reset is invalid or has expired');
        return res.redirect('/login');
    }

    const setPassword = promisify(user.setPassword, user);
    await setPassword(req.body.password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    const updatedUser = await user.save();
    await req.login(updatedUser);
    req.flash('success', 'Your password has been reset! You are now logged in!');
    res.redirect('/');
};
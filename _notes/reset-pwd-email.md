1. Add filed to User schema for reset password
    resetPasswordToken: String,
    resetPasswordExpires: Date,

2. Config file for the email server
    use mailtrap.io as the mail server

2. Email Handler
    const nodemailer = require('nodemailer');
    const pug = require('pug');
    const juice = require('juice');  //inline css
    const htmlToText = require('html-to-text');
    const promisify = require('es6-promisify');

    generate Html, insert css, convert text

    
    const html = pug.renderFile(`${__dirname}/../views/email/${filename}.pug`, options);
    const inlined = juice(html);    //inline css
    return inlined;

3. Template and Styles

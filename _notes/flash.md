# Flash
    Flash need session
    const session = require('express-session');
    session need connect-mongo
    const MongoStore = require('connect-mongo')(session);

1. use flash middle ware in app.js
    const flash = require('connect-flash');

    app.use(flash());

    // Inject variables and function to templates
    app.use((req, res, next) => {
        ...
        res.locals.flashes = req.flash();
        next();
    });

2. Add sass for the flash 
    
3. Display flash message in layout.pug
    req.flash('error', 'something happened.')
    req.flash('info', 'something happened.')
    req.flash('warning', 'something happened.')
    req.flash('others', 'something happened.')
    req.flash('unknown', 'something happened.')

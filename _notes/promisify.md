# promise

const promisify = require('es6-promisify');

// register method was provided by passportLocalMongoose middleware
// the function use callback
// User.register(user, req,body.password, function(err, user){})
// promisify(function, object bind to the function) can covert it to a promise
const register = promisify(User.register, User);
await register(user, req.body.password);
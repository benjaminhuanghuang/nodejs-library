const mongoose = require('mongoose');

// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 7 || (major === 7 && minor <= 5)) {
  console.log('You\'re on an older version of node that doesn\'t support the latest and greatest things we are learning (Async + Await)! Please go to nodejs.org and download version 7.6 or greater. \n ');
  process.exit();
}

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle an bad connections
// DeprecationWarning: `open()` is deprecated in mongoose >= 4.11.0, use `openUri()` instead, 
// or set the `useMongoClient` option if using `connect()` or `createConnection()`
mongoose.connect(process.env.DATABASE, { useMongoClient: true });
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`Database failed: ${err.message}`);
});

// import all of the models
require('./models/entity');

// Start our app!
const app = require('./app');
app.set('port', process.env.PORT || 2003);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running @ PORT ${server.address().port}`);
});

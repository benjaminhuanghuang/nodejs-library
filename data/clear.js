require('dotenv').config({ path: __dirname + '/../variables.env' });

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

// import all of our models - they need to be imported only once
const Entity = require('../models/entity');

async function deleteData() {
  console.log('Clear all data...');
  await Entity.remove();
  console.log('Data Deleted. To load sample data, run\n\n\t npm run sample\n\n');
  process.exit();
}


deleteData();
/*
    Utility functions used in template
*/

// FS is a built in module to node that let's us read files from the system
const fs = require('fs');

// Dump is a handy debugging function to display data
exports.dump = (obj) => JSON.stringify(obj, null, 2);

// moment.js is a handy library for displaying dates. We need this in our templates to display 
// things like "Posted 5 minutes ago" by using moment(review.created).fromNow()
exports.moment = require('moment');

exports.siteName = `Tech Library`;
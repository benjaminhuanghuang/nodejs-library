/*
    Utility functions used in template
*/

// FS is a built in module to node that let's us read files from the system
const fs = require('fs');

// Dump is a handy debugging function to display data
exports.dump = (obj) => JSON.stringify(obj, null, 2);

exports.siteName = `Tech Library`;
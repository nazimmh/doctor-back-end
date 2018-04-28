'use strict';
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dbDoctor', function(err) {
  if (err) throw err;
  console.log('Successfully connected to MongoDB');
});

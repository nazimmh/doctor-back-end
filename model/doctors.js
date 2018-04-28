'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var DoctorSchema = new Schema(
  {
    doctor: {
      type: String,
      unique: true,
      required: 'doctor id is required'
    },
    name: {
      type: String
    },
    phone: {
      type: String
    },
    address: {
      type: String
    },
    specialities: {
      type: Array[Schema.Types.Mixed]
    },
    // login information
    email: {
      type: String,
      minlength: 5,
      maxlength: 50,
      match: /\S+@\S+\.\S+/,
      required: true,
      index: { unique: true }
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

DoctorSchema.pre('save', function(next) {
  var doctor = this;
  // only hash if it's new or modified
  if (!doctor.isModified('password')) return next();

  // generate salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
    // generate the hash
    bcrypt.hash(doctor.password, salt, function(err, hash) {
      if (err) return next(err);
      // store the hash here
      doctor.password = hash;
      next();
    });
  });
});

DoctorSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('doctors', DoctorSchema);

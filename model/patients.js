'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var PatientSchema = new Schema(
  {
    patient: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      required: true,
      maxlength: 250
    },
    address: {
      street: { type: String, default: '' },
      zipCode: { type: Number },
      city: { type: String }
    },
    phone: {
      type: String
    },
    maladies: {
      type: Schema.Types.ObjectId,
      ref: 'Diseases'
    },
    // patient family member
    proche: {
      name: { type: String },
      email: {
        type: String,
        minLength: 5,
        maxlength: 50,
        match: /\S+@\S+\.\S+/,
        index: { unique: true }
      },
      phone: {
        type: String
      }
    },
    // doctors who are following this patient
    doctors: [
      {
        type: Schema.Types.ObjectId,
        ref: 'doctors'
      }
    ],
    // drugs list
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
    },
    deviceID: {
      type: String
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

PatientSchema.pre('save', function(next) {
  var patient = this;

  if (!patient.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(patient.password, salt, function(err, hash) {
      if (err) return next(err);
      patient.password = hash;
      next();
    });
  });
});

PatientSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('Patients', PatientSchema);

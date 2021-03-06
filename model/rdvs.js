'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppointmentSchema = new Schema(
  {
    appointment: {
      type: String,
      unique: true,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'doctors'
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'Patients'
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('Appointments', AppointmentSchema);

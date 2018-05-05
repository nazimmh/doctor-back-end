'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessagesSchema = new Schema(
  {
    message: {
      type: String,
      unique: true,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    seen: {
      type: Boolean,
      default: false
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'Patients'
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'Doctors'
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('Messages', MessagesSchema);

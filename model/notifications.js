'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotificationSchema = new Schema(
  {
    notification: {
      type: String,
      unique: true,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    sender: {
      // mayeb doctor or patient
      type: Schema.Types.ObjectId
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('Notifications', NotificationSchema);

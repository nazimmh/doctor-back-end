'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IndicatorSchema = new Schema(
  {
    indicator: {
      type: String,
      unique: true,
      requried: true
    },
    name: {
      type: String,
      maxlength: 250
    },
    description: {
      type: String,
      maxlength: 500
    },
    threshold: {
      type: Number,
      required: true
    },
    speciality: {
      type: Schema.Types.ObjectId,
      ref: 'Diseases'
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('Indicators', IndicatorSchema);

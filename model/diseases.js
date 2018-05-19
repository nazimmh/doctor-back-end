'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DiseaseSchema = new Schema(
  {
    disease: {
      type: String,
      unique: true,
      requried: true
    },
    name: {
      type: String
    },
    description: {
      type: String,
      maxlength: 500
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('Diseases', DiseaseSchema);

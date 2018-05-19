'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DrugSchema = new Schema(
  {
    drug: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String
    },
    description: {
      type: String
    },
    schedule: [
      {
        time: { type: Number },
        quantity: { type: Number }
      }
    ],
    disease: {
      type: Schema.Types.ObjectId,
      ref: 'Diseases'
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('Drugs', DrugSchema);

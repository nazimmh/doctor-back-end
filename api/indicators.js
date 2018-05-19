'use strict';
var mongoose = require('mongoose');
var Indicator = require('./../model/indicators');
var uuid = require('uuid/v4');

const getAllIndicators = function (req, res, next) {
  Indicator.find().populate('speciality').exec(function(err, result) {
    if (err) return res.send(err);
    return res.status(200).json(result);
  })
};

const getIndicator = function (req, res, next) {
  const id = req.params.id;
  if(!id)
    return res.status(400).json({ message: 'id is required' });

  Indicator.findOne({ _id: id }).populate('speciality').exec(function(err, result) {
    if (err) return res.send(err);
    return res.status(200).json(result);
  });
};

const updateIndicator = function (req, res, next) {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: 'id is required' });
  const {
    name,
    description,
    threshold,
    speciality,
  } = req.body;

  Indicator.findOne({ _id: id }, function(err, result) {
    if (err) res.send(err);
    result.name = name;
    result.description = description;
    result.threshold = threshold;
    result.speciality = new mongoose.Types.ObjectId(speciality);
    // save all
    result.save(function(err) {
      if (err) return res.send(err);
      return res.status(200).json({ message: 'indicator saved '});
    });
  });
};

const addIndicator = function (req, res, next) {
  const {
    name,
    description,
    threshold,
    speciality,
  } = req.body;
  let indicator = new Indicator();
  indicator.indicator = uuid();
  indicator.name = name;
  indicator.description = description;
  indicator.threshold = threshold;
  indicator.speciality = new mongoose.Types.ObjectId(speciality);
  indicator.save(function(err) {
    if (err) res.send(err);
    res.status(201).json({ message: 'Indicator created' });
  });
};

module.exports = {
  getAllIndicators,
  getIndicator,
  updateIndicator,
  addIndicator,
};

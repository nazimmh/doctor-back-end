'use strict';
var Types = require('mongoose').Types;
var uuid = require('uuid/v4');
var Drug = require('./../model/drugs');

const getAllDrugs = function (req, res, next) {
  Drug.find().populate('disease').exec(function(err, result) {
    if (err) return res.status(400).send(err);
    return res.status(200).json(result);
  })
};

const getDrug = function (req, res, next) {
  const id = req.params.id;
  if (!id)
    return res.status(400).json({ message: 'id is required' });

  Drug.find({ _id: id }).populate('disease').exec(function(err, result) {
    if (err) return res.status(400).send(err);
    return res.status(200).json(result);
  });
};

const updateDrug = function (req, res, next) {
  const id = req.params.id;
  const {
    name,
    description,
    schedule,
    disease,
  } = req.body;
  if (!id)
    return res.status(400).json({ message: 'id is required' });

  Drug.findOne({ _id: id }, function(err, result) {
    if (err)
      return res.status(400).send(err);

    result.name = name;
    result.description = description;
    result.schedule = schedule;
    result.disease = new Types.ObjectId(disease);
    result.save(function(err) {
      if (err)
        return res.status(400).send(err);
      return res.status(200).json(result);
    })
  });
};

const addDrug = function (req, res, next) {
  const {
    name,
    description,
    schedule,
    disease,
  } = req.body;
  let drug = new Drug();
  drug.drug = uuid();
  drug.name = name;
  drug.description = description;
  drug.schedule = schedule;
  drug.disease = new Types.ObjectId(disease);

  drug.save(function(err) {
    if (err)
      return res.status(400).send(err);
    return res.status(200).json(drug);
  });
};

module.exports = {
  getAllDrugs,
  getDrug,
  updateDrug,
  addDrug,
};

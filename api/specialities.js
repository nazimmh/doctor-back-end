'use strict';
var uuid = require('uuid/v4');
var Specialities = require('./../model/diseases');

const getAllSpecialities = function(req, res, next) {
  Specialities.find(function(err, specialities){
    if (err) return res.status(400).json(err);
    return res.status(200).json(specialities)
  });
};

const getSpeciality = function(req, res, next) {
  const specilityId = req.params.id;
  if (!specilityId) return res.status(400).json({ message: 'speciality id is required '});
  Specialities.findOne({ _id: specilityId }, function(err, speciality) {
    if (err) return res.status(400).json(err);
    return res.status(200).json(speciality);
  });
};

const addSpeciality = function(req, res, next) {
  const speciality = new Specialities();
  speciality.disease = uuid();
  speciality.name = req.body.name;
  speciality.description = req.body.description;
  speciality.save(function(err){
    if (err) return res.status(400).json(err);
    return res.status(200).json({ message: 'Speciality added '});
  });
};

const updateSpeciality = function(req, res, next) {
  var id = req.params.id;
  const {
    name,
    description
  } = req.body;

  if (!id)
    return res.status(400).json({ message: 'speciality is invalid' });

  Specialities.findOne({ _id: id }, function(err, specialityDb) {
    if (err) return res.status(400).json(err);
    specialityDb.name = name;
    specialityDb.description = description;

    specialityDb.save(function(err) {
      if (err) res.send(err);
      res.status(200).json({ message: 'Speciality saved' });
    })
  });
};

module.exports = {
  getAllSpecialities,
  getSpeciality,
  addSpeciality,
  updateSpeciality,
};

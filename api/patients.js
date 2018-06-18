'use strict';
var Types = require('mongoose').Types;
var uuid = require('uuid');
var Patients = require('./../model/patients');

const getAllPatients = function (req, res, next) {
  Patients
    .find()
    .populate('doctors')
    .populate('maladies')
    .exec(function(err, result) {
      if (err)
        return res.status(400).send(err);
      return res.status(200).json(result);
  });
};

const getPatient = function(req, res, next) {
  const id = req.params.id;
  if (!id)
    return res.status(400).json({ message: 'id is required' });

  Patients
    .findOne({ _id: id })
    .populate('doctors')
    .populate('maladies')
    .exec(function(err, result) {
      if (err)
        return res.status(400).send(err);

      return res.status(200).json(result);
  });
};

const updatePatient = function(req, res, next) {
  const id = req.params.id;
  if (!id)
    return res.status(400).send(err);

  const {
    name,
    address,
    phone,
    maladies,
    proche,
    email,
    password,
    deviceID,
  } = req.body;

  Patients
    .findOne({ _id: id })
    .populate('doctors')
    .populate('maladies')
    .exec(function(err, result) {
      if (err)
        return res.status(400).send(err);

      result.name = name ? name : result.name;
      result.address = address ? address : result.address;
      result.phone = phone ? phone : result.phone;
      result.maladies = maladies ? Types.ObjectId(maladies) : result.maladies;
      result.proche = proche ? proche : result.proche;
      result.email = email ? email : result.email;
      result.password = password ? password : result.password;
      result.deviceID = deviceID ? deviceID : result.deviceID;

      result.save(function(err) {
        if (err)
          return res.status(400).send(err);

        return res.status(200).send(result);
      });
    });
};

const addPatient = function(req, res, next) {
  const {
    name,
    address,
    phone,
    maladies,
    proche,
    email,
    password,
    deviceID,
  } = req.body;

  let patient = new Patients();
  patient.patient = uuid();
  patient.name = name;
  patient.address = address;
  patient.phone = phone;
  patient.maladies = maladies;
  patient.proche = proche;
  patient.email = email;
  patient.password = password;
  patient.deviceID = deviceID;

  patient.save(function(err) {
    if (err)
      return res.status(400).send(err);

    return res.status(200).send(patient);
  });
};

const associateToDoctor = function(req, res, next) {
  const id = req.params.id;
  const {
    doctor
  } = req.body;

  Patients.findByIdAndUpdate(id,
    { $push: { doctors: new Types.ObjectId(doctor) } },
    { safe: true, upsert: true }, function(err, result) {
      if (err)
        return res.status(400).send(err);

      return res.status(200).json(result);
    });
};

const unassociateDoctor = function(req, res, next) {
  const id = req.params.id;
  const {
    doctor,
  } = req.body;

  if (!id)
    return res.status(400).json({ message: 'id is required' });
  if (!doctor)
    return res.status(400).json({ message: 'doctor id is required' });

  Patients.update(
    { _id: new Types.ObjectId(id) },
    { $pull: { doctors: { _id: new Types.ObjectId(doctor) }}},
    { safe: true },
    function(err, result) {
      if (err)
        return res.status(400).send(err);
      return res.status(200).json(result);
    }
  );
};

const authenticate = function(req, res, next) {
  const {
    email,
    password,
  } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email & password are required' });

  Patients.findOne({ email: email.toLowerCase() }, function(err, result) {
    if (err) return res.status(400).json(err);
    if (!result) return res.status(400).json({ message: 'no user found '});

    result.comparePassword(password, function(err, isMatch){
      if (err) return res.status(400).json(err);
      if (isMatch) {
        return res.status(200).json({ uid: result._id, token: 'Your token here '});
      } else {
        return res.status(403).json({ message: 'Incorrect password' });
      }
    });
  });
};

module.exports = {
  getAllPatients,
  getPatient,
  updatePatient,
  addPatient,
  associateToDoctor,
  unassociateDoctor,
  authenticate,
};

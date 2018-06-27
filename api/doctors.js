'use strict';
var uuid = require('uuid/v4');
var Doctor = require('./../model/doctors');
var exports = (module.exports = {});
var Types = require('mongoose').Types;

exports.listDoctors = function(req, res, next) {
  Doctor.find(function(err, doctors) {
    if (err) res.send(err);
    res.status(200).json(doctors);
  });
};

exports.addDoctor = function(req, res, next) {
  const {
    name,
    email,
    password,
    address,
    deviceID,
    speciality,
  } = req.body;
  let doctor = new Doctor();
  doctor.doctor = uuid();
  doctor.name = name;
  doctor.email = email;
  doctor.address = address;
  doctor.password = password;
  doctor.deviceID = deviceID;
  // if (speciality) {
  //   doctor.specialities = doctor.specialities ?
  //     doctor.specialities.push({ _id: new Types.ObjectId(speciality) }) : doctor.specialities;
  // }
  // save
  doctor.save(function(err) {
    if (err) {
      return res.send(err);
    }
    return res.status(201).json({ message: 'Doctor created' });
  });
};

exports.findDoctor = function(req, res, next) {
  const doctorId = req.params.doctorId;
  if (!doctorId) {
    return res.status(400).json({ message: "id can't be null" });
  }
  Doctor.findOne({ _id: doctorId }, function(err, doctorDb) {
    if (err) return res.status(400).json(err);
    return res.status(200).json(doctorDb);
  });
};

exports.updateDoctor = function(req, res, next) {
  const doctor = req.params.doctorId;
  const {
    name,
    email,
    address,
    deviceID,
    password,
    specialities,
  } = req.body;
  if (!doctor)
    return res.status(400).json({ message: 'doctor is invalid' });

  Doctor.findOne({ _id: doctor }, function(err, doctorDb) {
    if (err) return res.status(400).json(err);
    if (!doctorDb) return res.status(404).json({ message: 'doctor not found'});
    doctorDb.name = name ? name : doctorDb.name;
    doctorDb.email = email ? email : doctorDb.email;
    doctorDb.address = address ? address : doctorDb.address;
    doctorDb.deviceID = deviceID ? deviceID : doctorDb.deviceID;
    doctorDb.password = password ? password : doctorDb.password;
    doctorDb.specialities = specialities ? specialities : doctorDb.specialities;
    doctorDb.save(function(err) {
      if (err) res.send(err);
      res.status(200).json({ message: 'Doctor saved' });
    })
  });
};

exports.authenticate = function(req, res, next) {
  const {
    email,
    password,
  } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email & password are required' });

  Doctor.findOne({ email }, function(err, doctorDb) {
    if (err) return res.status(400).json(err);
    doctorDb.comparePassword(password, function(err, isMatch){
      if (err) return res.status(400).json(err);
      if (isMatch) {
        return res.status(200).json({ token: 'Your token here '});
      } else {
        return res.status(403).json({ message: 'Incorrect password' });
      }
    });
  });
};

'use strict';

var ObjectId = require('mongoose').Types.ObjectId;
var uuid = require('uuid');
var Appointment = require('./../model/rdvs');

const getAllAppointment = function(req, res, next) {
  Appointment
    .find()
    .populate('doctor')
    .populate('patient')
    .exec(function(err, result) {
      if (err)
        return res.status(400).send(err);

      return res.status(200).json(result);
    });
};

const getAppointment = function(req, res, next) {
  const id = req.params.id;
  if (!id)
    return res.status(400).json({ message: 'id is required' });

  Appointment
    .findById(id)
    .populate('doctor')
    .populate('patient')
    .exec(function(err, result) {
      if (err)
        return res.status(400).send(err);
      return res.status(200).json(result);
    });
};

const addAppointment = function(req, res, next) {
  const id = req.params.id;
  const {
    description,
    date,
    patient,
  } = req.body;

  if(!id)
    return res.status(400).json({ message: 'id is required' });

  let appointment = new Appointment({
    appointment: uuid(),
    description,
    date,
    doctor: new ObjectId(id),
    patient: new ObjectId(patient),
  });
  appointment.save(function(err) {
    if (err)
      return res.status(400).send(err);
    return res.status(200).json(appointment);
  })
};

const updateAppointment = function(req, res, next) {
  const id = req.params.id;
  const {
    description,
    date,
  } = req.body;

  Appointment.findOne({ _id: id }, function(err, result) {
    if (err)
      return res.status(400).send(err);

    result.description = description ? description : result.description;
    result.date = date ? date : result.date;
    result.save(function(err) {
      if (err)
        return res.status(400).send(err);
      return res.status(200).json(result);
    })
  });
};

const deleteAppointment = function(req, res, next) {
  const id = req.params.id;
  if (!id)
    return res.status(400).json({ message: 'id is required' });

  Appointment.findOneAndRemove({ _id: id }, function(err) {
    if (err)
      return res.status(400).send(err);
    return res.status(204).json({ message: 'appointment deleted' });
  });
};

module.exports = {
  getAllAppointment,
  getAppointment,
  addAppointment,
  updateAppointment,
  deleteAppointment,
};

'use strict';

var express = require('express');
var router = express.Router();
var doctorsApi = require('./doctors');
var patients = require('./patients');
var specialities = require('./specialities');
var drugs = require('./drugs');
var indicators = require('./indicators');
var appointments = require('./appointments');
var messages = require('./messages');

router.use(function(req, res, next) {
  console.log('requesting...');
  next();
});

// doctors api
router.route('/doctors').get(doctorsApi.listDoctors);
router.route('/doctors/:doctorId').get(doctorsApi.findDoctor);
router.route('/doctors').post(doctorsApi.addDoctor);
router.route('/doctors/:doctorId').put(doctorsApi.updateDoctor);
router.route('/doctors/authenticate').post(doctorsApi.authenticate);

// specialities api
router.route('/specialities').get(specialities.getAllSpecialities);
router.route('/specialities/:id').get(specialities.getSpeciality);
router.route('/specialities/:id').put(specialities.updateSpeciality);
router.route('/specialities').post(specialities.addSpeciality);

// drugs api
router.route('/drugs').get(drugs.getAllDrugs);
router.route('/drugs/:id').get(drugs.getDrug);
router.route('/drugs/:id').put(drugs.updateDrug);
router.route('/drugs').post(drugs.addDrug);

// indicator api
router.route('/indicators').get(indicators.getAllIndicators);
router.route('/indicators/:id').get(indicators.getIndicator);
router.route('/indicators/:id').put(indicators.updateIndicator);
router.route('/indicators').post(indicators.addIndicator);

// patient api
router.route('/patients').get(patients.getAllPatients);
router.route('/patients/:id').get(patients.getPatient);
router.route('/patients/:id').put(patients.updatePatient);
router.route('/patients').post(patients.addPatient);
router.route('/patients/:id/associate').put(patients.associateToDoctor);
router.route('/patients/:id/unAssociate').put(patients.unassociateDoctor);
router.route('/patients/authenticate').post(patients.authenticate);

// appointment api
router.route('/appointments').get(appointments.getAllAppointment);
router.route('/appointments/:id').get(appointments.getAppointment);
router.route('/appointments/:id').put(appointments.updateAppointment);
router.route('/appointments/:id').delete(appointments.deleteAppointment);
router.route('/appointments').post(appointments.addAppointment);

// message api
router.route('/messages').get(messages.getAllMessages);
router.route('/messages').get();
router.route('/messages').get();
router.route('/messages').get();

module.exports = router;

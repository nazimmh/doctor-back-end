'use strict';

var express = require('express');
var router = express.Router();
var doctorsApi = require('./doctors');

// doctors api
router.route('/doctors').get(doctorsApi.listDoctors);
router.route('/doctors').post(doctorsApi.addDoctor);

module.exports = router;

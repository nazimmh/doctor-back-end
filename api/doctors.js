'use strict';
var exports = (module.exports = {});

exports.listDoctors = function(req, res, next) {
  return res.status(200).json({ doctor: 'test' });
};

exports.addDoctor = function(req, res, next) {
  console.log(req.body);
  // create the doctor here
  return res.status(201).json(req.body);
};

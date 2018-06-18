'use strict';

var uuid = require('uuid/v4');
var ObjectId = require('mongoose').Types.ObjectId;
var Messages = require('./../model/messages');

const getAllMessages = function(req, res, next) {

};

module.exports = {
  getAllMessages,
};

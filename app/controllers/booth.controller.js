'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const StandardError = require('standard-error')
const generalController = require('./general.controller')
const { createBoothHelper, getBoothHelper, deleteBoothHelper, updateBoothHelper } = require('../helpers/booth.helper')

// Create Turnstile
const createBooth = function (req, res) {
  return createBoothHelper(req.validatedBody)
    .then(function (data) {
      generalController.successResponse(res, 'Booth Created  successfully', data, 'booth.controller.createBooth')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, 'booth.controller.createTurnstile', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'booth.controller.createBooth', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// Get Turnstile
const getBooth = function (req, res) {
  return getBoothHelper(req.conditions, req.limit, req.offset)
    .then(function (data) {
      generalController.successResponse(res, 'Booths fetched successfully', data, 'booth.controller.getBooth')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, 'booth.controller.getBooth', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'booth.controller.getBooth', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// Delete Turnstile
const deleteBooth = function (req, res) {
  return deleteBoothHelper(req.params.id)
    .then((data) => {
      generalController.successResponse(res, 'Booth deleted successfully.', data, 'booth.controller.deleteBooth')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'booth.controller.deleteBooth', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'booth.controller.deleteBooth', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// Update Turnstile
const updateBooth = (req, res) => {
  return updateBoothHelper(req.params.id, req.body)
    .then((data) => {
      generalController.successResponse(res, 'Booth Updated successfully.', data, 'booth.controller.updateBooth')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'booth.controller.updateBooth', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'booth.controller.updateBooth', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

module.exports = { createBooth, getBooth, deleteBooth, updateBooth }
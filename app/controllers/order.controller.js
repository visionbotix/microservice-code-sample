'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const { createOrderHelper } = require('../helpers/order.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

/** Create Stall  */
const createOrder = function (req, res) {
  return createOrderHelper(req.validatedOrder, req.validatedProducts, req.validatedTransaction)
    .then(function (data) {
      generalController.successResponse(res, 'Order added successfully.', data, 'Order.controller.createOrder')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'Order.controller.createOrder', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'Order.controller.createOrder', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

module.exports = { createOrder }

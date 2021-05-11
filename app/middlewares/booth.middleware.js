'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// Add Booth
const validateCreateBooth = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}

  // validating as required string field
  if (!body.title || body.title.length < 2 || body.title.length > 100) {
    errorArray.push({
      field: 'title',
      error: 'MVCB-5',
      message: 'The title is required with min 2 and max 100 characters.'
    })
  }

  // Validating status as Active or InActive
  if (!body.status || (body.status !== 'Active' && body.status !== 'InActive')) {
    errorArray.push({
      field: 'status',
      error: 'MVCB-10',
      message: 'Please provide valid \'status\' which is Active or InActive.'
    })
  }

  // validating as required number field
  if (!body.UserId || isNaN(body.UserId) || body.UserId < 1 || body.UserId > 99999999999) {
    errorArray.push({
      field: 'UserId',
      error: 'MVCB-15',
      message: 'The UserId is required with min 1 and max 99999999999 value.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'booth.middleware.validateCreateBooth')
  }

  validatedBody.title = body.title
  validatedBody.status = body.status
  validatedBody.UserId = body.UserId
  req.validatedBody = validatedBody
  done()
}

// Get Booth
const validateGetBooth = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validateConditions = {}

  if (query.hasOwnProperty('title') && query.title) {
    validateConditions.title = query.title
  }

  if (query.hasOwnProperty('status') && query.status) {
    validateConditions.status = query.status
  }

  if (query.hasOwnProperty('UserId') && query.amount) {
    validateConditions.UserId = query.UserId
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'booth.middleware.validateGetBooth')
  }

  req.conditions = validateConditions
  req.limit = req.query.limit && !isNaN(req.query.limit) ? parseInt(req.query.limit) : 20
  req.offset = req.query.offset && !isNaN(req.query.offset) ? parseInt(req.query.offset) : 0

  done()
}

// Delete Booth
const validateDeleteBooth = (req, res, done) => {
  const errorArray = []

  if (!req.params.id || isNaN(req.params.id)) {
    errorArray.push({
      field: 'id',
      error: 'MVDB-5',
      message: "Please provide only valid 'id' as number."
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'booth.middleware.validateDeleteBooth')
  }

  done()
}

// Update Booth
const validateUpdateBooth = (req, res, done) => {
  const errorArray = []
  const params = req.params
  const body = req.body
  const validatedBody = {}

  if (!params.id || isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 'MVUB-5',
      message: 'Please provide only valid \'BoothId\' as numeric.'
    })
  }

  // validating as optional string field
  if (body.hasOwnProperty('title') && body.title) {
    if (body.title.length < 2 || body.title.length > 100) {
      errorArray.push({
        field: 'title',
        error: 'MVUB-10',
        message: 'The title should be string with min 2 and max 100 characters.'
      })
    }
    validatedBody.title = body.title
  }

  // validating as optional string field
  if (body.hasOwnProperty('status') && body.status) {
    if (body.status !== 'Active' && body.status !== 'InActive') {
      errorArray.push({
        field: 'status',
        error: 'MVUB-15',
        message: 'Please provide valid \'status\' which is Active or InActive.'
      })
    }
    validatedBody.status = body.status
  }

  // validating as optional number field
  if (body.hasOwnProperty('UserId') && body.UserId) {
    if (isNaN(body.UserId) || body.UserId < 1 || body.UserId > 99999999999) {
      errorArray.push({
        field: 'UserId',
        error: 'MVUB-20',
        message: 'The UserId should be number with min 1 and max 99999999999 value.'
      })
    }
    validatedBody.UserId = body.UserId
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'booth.middleware.validateUpdateBooth')
  }

  req.validatedBody = validatedBody
  done()
}

module.exports = {
  validateCreateBooth,
  validateGetBooth,
  validateDeleteBooth,
  validateUpdateBooth
}
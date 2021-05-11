'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

const validateCreateOrder = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedOrder = { total: 0, discount: 0 }
  const validatedProducts = []
  const validatedTransaction = []

  if (!body.orderType || (body.orderType !== 'Standard' && body.orderType !== 'Ride' && body.orderType !== 'Gate')) {
    errorArray.push({
      field: 'orderType',
      error: 'MVCO-10',
      message: 'Please provide only valid \'orderType\'.'
    })
  }

  // validating as optional number field
  if (body.hasOwnProperty('discount') && body.discount) {
    if (isNaN(body.discount) || body.discount < 0 || body.discount > 999999999) {
      errorArray.push({
        field: 'discount',
        error: 'MVCO-10',
        message: 'The discount should be number with min 0 and max 999999999 value.'
      })
    }
    validatedOrder.discount = parseFloat(body.discount)
  }

  if (body.orderType === 'Standard') {
    // validating as required number field
    if (!body.StallId || isNaN(body.StallId) || body.StallId < 1 || body.StallId > 99999999999) {
      errorArray.push({
        field: 'StallId',
        error: 'MVCO-15',
        message: 'The StallId is required with min 1 and max 99999999999 value.'
      })
    }
    validatedOrder.StallId = body.StallId
  }

  // this is array of objects for products.
  if (_.isEmpty(body.products) || !_.isArray(body.products)) {
    errorArray.push({
      field: 'products',
      error: 'MVCO-20',
      message: 'Please provide only valid \'products\' as array of objects.'
    })
  } else {
    for (let i = 0; i < body.products.length; i++) {
      const product = body.products[i]
      const validatedProduct = { discount: 0 }

      // Validating as Number and length range.
      if (!body.ProductId || isNaN(product.ProductId) || body.ProductId.length < 1) {
        errorArray.push({
          field: 'ProductId',
          error: 'MVCO-25',
          message: '\'ProductId\' is required as Number.'
        })
      }

      // Validating as Number and length range.
      if (!body.amount || isNaN(product.amount) || product.amount.length < 1) {
        errorArray.push({
          field: 'amount',
          error: 'MVCO-30',
          message: '\'amount\' is required as Number, length must be greater then 1.'
        })
      }

      // validating as required number field
      if (!product.quantity || isNaN(product.quantity) || product.quantity < 1 || product.quantity > 999999) {
        errorArray.push({
          field: 'quantity',
          error: 'MVCO-35',
          message: 'The quantity is required with min 1 and max 999999 value.'
        })
      }

      // validating as optional number field
      if (product.hasOwnProperty('discount') && product.discount) {
        if (isNaN(product.discount) || product.discount < 0 || product.discount > 99999999999) {
          errorArray.push({
            field: 'discount',
            error: 'MVCO-40',
            message: 'The discount should be number with min 0 and max 99999999999 value.'
          })
        }
        validatedProduct.discount = parseFloat(product.discount)
      }

      validatedProduct.ProductId = product.ProductId
      validatedProduct.quantity = product.quantity
      validatedProduct.amount = parseFloat(product.amount)

      // adding amount in order total
      validatedOrder.total += parseFloat(product.amount) - parseFloat(product.discount)

      validatedProducts.push(validatedProduct)
    }
  }

  // validating as optional string field
  if (!body.source || (body.source !== 'Cash' && body.source !== 'Band' && body.source !== 'App')) {
    errorArray.push({
      field: 'source',
      error: 'MVCO-45',
      message: 'The source is required as Band, Cash, App.'
    })
  } else {
    if (body.source == 'Band') {
      // validating as required number field
      if (!body.BandId || isNaN(body.BandId) || body.BandId < 1 || body.BandId > 99999999999) {
        errorArray.push({
          field: 'BandId',
          error: 'MVCO-50',
          message: 'The BandId is required with min 1 and max 99999999999 value.'
        })
      }
      validatedTransaction.BandId = body.BandId
    } else if (body.source == 'App') {
      // validating as required number field
      if (!body.UserId || isNaN(body.UserId) || body.UserId < 1 || body.UserId > 99999999999) {
        errorArray.push({
          field: 'UserId',
          error: 'MVCO-55',
          message: 'The UserId is required with min 1 and max 99999999999 value.'
        })
      }
      validatedTransaction.UserId = body.UserId
    }
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'order.middleware.validateCreateOrder')
  }

  validatedOrder.orderType = body.orderType

  validatedTransaction.type = 'Debit'
  validatedTransaction.source = body.source
  validatedTransaction.amount = validatedOrder.total

  req.validatedOrder = validatedOrder
  req.validatedProducts = validatedProducts
  req.validatedTransaction = validatedTransaction
  done()
}

module.exports = { validateCreateOrder }

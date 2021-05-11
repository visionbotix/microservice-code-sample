'use strict'
const { createOrder } = require('../controllers/Order.controller')
const { validateCreateOrder } = require('../middlewares/Order.middleware')
const passport = require('../config/passport'
)
module.exports = function (app, apiVersion) {
  const route = apiVersion + '/order'

  app.post(route, passport.authenticate('jwt', { session: false }), validateCreateOrder, createOrder)
}

'use strict'
const passport = require('../config/passport')
const { createBooth, getBooth, deleteBooth, updateBooth } = require('../controllers/booth.controller')
const { validateCreateBooth, validateGetBooth, validateDeleteBooth, validateUpdateBooth } = require('../middlewares/booth.Middleware')

module.exports = function (app, apiVersion) {
     const route = apiVersion + '/booth'

     app.post(route, passport.authenticate('jwt', { session: false }), validateCreateBooth, createBooth)
     app.get(route, passport.authenticate('jwt', { session: false }), validateGetBooth, getBooth)
     app.delete(route + '/:id', passport.authenticate('jwt', { session: false }), validateDeleteBooth, deleteBooth)
     app.put(route + '/:id', passport.authenticate('jwt', { session: false }), validateUpdateBooth, updateBooth)
}

'use strict'
const db = require('../config/sequelize.config')
// const Op = db.Sequelize.Op
const generalHelper = require('./general.helper')

const createOrderHelper = async (order, products, transaction) => {
  // If user is not paying through cash validating his balance in app or band.
  if (transaction.source === 'App') {
    const user = await db.User.findOne({
      where: {
        id: transaction.UserId
      }
    }).catch(generalHelper.catchException)

    if (!user || user.balance < transaction.amount) {
      return generalHelper.rejectPromise({
        field: 'balance',
        error: 'COH-5',
        message: 'Your balance is not sufficient.'
      })
    }
  } else if (transaction.source === 'Band') {
    const band = await db.Band.findOne({
      where: {
        id: transaction.BandId
      }
    }).catch(generalHelper.catchException)

    if (!band || band.balance < transaction.amount) {
      return generalHelper.rejectPromise({
        field: 'balance',
        error: 'COH-5',
        message: 'Your balance is not sufficient.'
      })
    }
  }

  // creating order now
  return db.Order.create(order)
    .then(async (createdOrder) => {
      // Adding order id in products and transaction as foreign key
      products.forEach(product => { product.OrderId = createdOrder.id })
      transaction.OrderId = createdOrder.id

      await db.OrderProduct.bulkCreate(products)
      await db.Transaction.create(transaction)
      return createdOrder
    })
    .catch(generalHelper.catchException)
}

module.exports = {
  createOrderHelper
}

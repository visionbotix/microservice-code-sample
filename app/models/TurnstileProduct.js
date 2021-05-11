'use strict'

module.exports = function (sequelize, DataTypes) {
  const TurnstileProduct = sequelize.define('TurnstileProduct', {
  }, {
    associate: function (models) {
      TurnstileProduct.belongsTo(models.Product, { foreignKey: 'ProductId', as: 'productTurnstiles' })
      TurnstileProduct.belongsTo(models.Turnstile, { foreignKey: 'TurnstileId', as: 'TurnstileProduct' })
    }
  })
  return TurnstileProduct
}

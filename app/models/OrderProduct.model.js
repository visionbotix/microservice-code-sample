'use strict'

module.exports = function (sequelize, DataTypes) {
  const OrderProduct = sequelize.define('OrderProduct', {
    title: {
      type: DataTypes.STRING(),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER(6)
    },
    amount: {
      type: DataTypes.DECIMAL(8, 2)
    },
    discount: {
      type: DataTypes.DECIMAL(8, 2)
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    associate: function (models) {
      OrderProduct.belongsTo(models.Product, { foreignKey: 'ProductId', as: 'orderProducts' })
      OrderProduct.belongsTo(models.Order, { foreignKey: 'OrderId', as: 'orderProductsOrders' })
    }
  })
  return OrderProduct
}

'use strict'

module.exports = function (sequelize, DataTypes) {
  const Product = sequelize.define('Product', {
    title: {
      type: DataTypes.STRING(),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(['Active', 'InActive']),
      allowNull: false,
      defaultValue: 'Active'
    },
    amount: {
      type: DataTypes.DECIMAL(8, 2)
    },
    productType: {
      type: DataTypes.ENUM(['Standard', 'Ride', 'Gate'])
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    associate: function (models) {
      Product.belongsTo(models.Stall, { foreignKey: 'StallId', as: 'productStalls' })
      Product.hasMany(models.OrderProduct, { foreignKey: 'ProductId', as: 'productOrderProduct' })
      Product.hasMany(models.ProductDiscount, { foreignKey: 'ProductId', as: 'productDiscounts' })
      Product.hasMany(models.ProductImage, { foreignKey: 'ProductId', as: 'productImages' })
    }
  })
  return Product
}

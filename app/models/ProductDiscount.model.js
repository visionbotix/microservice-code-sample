'use strict'

module.exports = function (sequelize, DataTypes) {
  const ProductDiscount = sequelize.define('ProductDiscount', {
    startDate: {
      type: DataTypes.DATE()
    },
    endDate: {
      type: DataTypes.DATE()
    },
    amount: {
      type: DataTypes.DECIMAL(8, 2)
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    associate: function (models) {
      ProductDiscount.belongsTo(models.Product, { foreignKey: 'ProductId', as: 'productDiscount' })
    }
  })
  return ProductDiscount
}

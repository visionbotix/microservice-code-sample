'use strict'

module.exports = function (sequelize, DataTypes) {
  const Stall = sequelize.define('Stall', {
    title: {
      type: DataTypes.STRING()
    },
    status: {
      type: DataTypes.ENUM(['Active', 'InActive']),
      allowNull: false,
      defaultValue: 'Active'
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    associate: function (models) {
      Stall.belongsTo(models.User, { foreignKey: 'UserId', as: 'userStalls' })
      Stall.hasMany(models.Product, { foreignKey: 'StallId', as: 'stallProducts' })
      Stall.hasMany(models.Order, { foreignKey: 'StallId', as: 'stallOrders' })
    }
  })
  return Stall
}

'use strict'

module.exports = function (sequelize, DataTypes) {
  const Turnstile = sequelize.define('Turnstile', {
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
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    associate: function (models) {
      Turnstile.hasMany(models.TurnstileProduct, { foreignKey: 'TurnstileId', as: 'turnstileProducts' })
    }
  })
  return Turnstile
}

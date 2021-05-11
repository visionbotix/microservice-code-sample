'use strict'

module.exports = function (sequelize, DataTypes) {
  const Band = sequelize.define('Band', {
    bandNumber: {
      type: DataTypes.STRING()
    },
    balance: {
      type: DataTypes.DECIMAL(8, 2)
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    associate: function (models) {
      Band.hasMany(models.Transaction, { foreignKey: 'BandId', as: 'bandTransaction' })
    }
  })
  return Band
}

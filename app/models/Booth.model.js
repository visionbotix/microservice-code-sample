'use strict'

module.exports = function (sequelize, DataTypes) {
  const Booth = sequelize.define('Booth', {
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
      Booth.belongsTo(models.User, { foreignKey: 'UserId', as: 'boothUser' })
    }
  })
  return Booth
}

'use strict'

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING()
    },
    lastName: {
      type: DataTypes.STRING()
    },
    email: {
      type: DataTypes.STRING()
    },
    password: {
      type: DataTypes.STRING()
    },
    status: {
      type: DataTypes.ENUM(['Active', 'InActive'])
    },
    balance: {
      type: DataTypes.DECIMAL(8, 2)
    },
    rewardPoints: {
      type: DataTypes.INTEGER(11)
    },
    RoleId: {
      type: DataTypes.INTEGER(11)
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    associate: function (models) {
      User.hasMany(models.Stall, { foreignKey: 'UserId', as: 'userStalls' })
      User.hasOne(models.Booth, { foreignKey: 'UserId', as: 'userBooth' })
      User.hasMany(models.Transaction, { foreignKey: 'UserId', as: 'userTransactions' })
    }
  })
  return User
}

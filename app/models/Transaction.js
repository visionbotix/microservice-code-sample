'use strict'

module.exports = function (sequelize, DataTypes) {
  const Transaction = sequelize.define('Transaction', {
    amount: {
      type: DataTypes.DECIMAL(8, 2)
    },
    rewardPointsGained: {
      type: DataTypes.INTEGER(11)
    },
    rewardPointsUsed: {
      type: DataTypes.INTEGER(11)
    },
    source: {
      type: DataTypes.ENUM(['Booth', 'Stall', 'Jazzcash', 'Easypaisa', 'Band', 'Cash', 'App'])
    },
    type: {
      type: DataTypes.ENUM(['Debit', 'Credit'])
    },
    refId: {
      type: DataTypes.STRING()
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    associate: function (models) {
      Transaction.belongsTo(models.Order, { foreignKey: 'OrderId', as: 'orderTransactions' })
      Transaction.belongsTo(models.Band, { foreignKey: 'BandId', as: 'bandsTransaction' })
      Transaction.belongsTo(models.User, { foreignKey: 'UserId', as: 'userTransaction' })
    }
  })
  return Transaction
}

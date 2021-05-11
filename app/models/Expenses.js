'use strict'

module.exports = function (sequelize, DataTypes) {
  const Expenses = sequelize.define('Expenses', {
    description: {
      type: DataTypes.TEXT(),
      allowNull: false
    },
    attachments: {
      type: DataTypes.STRING()
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
      Expenses.belongsTo(models.ExpenseCategory, { foreignKey: 'ExpenseCategoryId', as: 'expenseCategories' })
    }
  })
  return Expenses
}

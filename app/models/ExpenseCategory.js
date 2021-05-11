'use strict'

module.exports = function (sequelize, DataTypes) {
  const ExpenseCategory = sequelize.define('ExpenseCategory', {
    title: {
      type: DataTypes.STRING(100)
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    associate: function (models) {
      ExpenseCategory.hasMany(models.Expenses, { foreignKey: 'ExpenseCategoryId', as: 'expenseCategories' })
    }
  })
  return ExpenseCategory
}

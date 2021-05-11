'use strict'

module.exports = function (sequelize, DataTypes) {
  const Action = sequelize.define('Action', {
    title: {
      type: DataTypes.STRING()
    },
    identifier: {
      type: DataTypes.STRING()
    }
  }, {
    associate: function (models) {
      Action.belongsToMany(models.Module, {
        through: 'ModuleAction',
        foreignKey: 'ActionId'
      })
    }
  })
  return Action
}

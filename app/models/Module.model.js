'use strict'

module.exports = function (sequelize, DataTypes) {
  const Module = sequelize.define('Module',
    {
      title: {
        type: DataTypes.STRING()
      },
      identifier: {
        type: DataTypes.STRING()
      },
      description: {
        type: DataTypes.STRING()
      }
    }, {
      associate: function (models) {
        Module.belongsToMany(models.Action, {
          as: 'actions',
          through: 'ModuleAction',
          foreignKey: 'ModuleId'
        })
      }
    }
  )
  return Module
}

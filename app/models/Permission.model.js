'use strict'

module.exports = function (sequelize, DataTypes) {
  const Permission = sequelize.define('Permission',
    {
      ModuleActionId: {
        type: DataTypes.INTEGER(11)
      },
      RoleId: {
        type: DataTypes.INTEGER(11)
      }
    }
  )
  return Permission
}

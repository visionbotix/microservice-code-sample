'use strict'

module.exports = function (sequelize, DataTypes) {
  const ProductImage = sequelize.define('ProductImage', {
    url: {
      type: DataTypes.STRING(250)
    },
    sizes:{
      type:DataTypes.STRING(250)
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    associate: function (models) {
      ProductImage.belongsTo(models.Product, { foreignKey: 'ProductId', as: 'productImages' })
    }
  })
  return ProductImage
}
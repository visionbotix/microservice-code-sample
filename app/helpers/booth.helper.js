'use strict'
const db = require('../config/sequelize.config')
const Op = db.Sequelize.Op

// Create Booth
function createBoothHelper (data) {
  return db.Booth.create(data)
}

// Get Booth
function getBoothHelper (conditions, limit, offset) {
  const where = { isDeleted: false }

  if (conditions.title) {
    where[Op.or] = {
      title: {
        [Op.like]: '%' + conditions.title + '%'
      }
    }
  }

  if (conditions.status) {
    where.status = conditions.status
  }

  if (conditions.UserId) {
    where.UserId = conditions.UserId
  }

  return db.Booth.findAndCountAll({
    where,
    limit,
    offset
  })
}

// Delete Booth
function deleteBoothHelper (id) {
  return db.Booth.update({ isDeleted: true }, { where: { id: id } })
}

// Update Booth
function updateBoothHelper (id, data) {
  return db.Booth.update(data, {
    where: {
      id
    }
  })
}

module.exports = {
  createBoothHelper,
  getBoothHelper,
  deleteBoothHelper,
  updateBoothHelper
}

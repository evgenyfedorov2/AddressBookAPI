'use strict'

const { User } = require('../database/postgresql/models')

/**
 * Find user by id
 * @param {Number} id User id
 * @return {Promise<User>}
 */
function findById(id) {
  return User.query().where('id', id).first()
}

/**
 * Find user by email
 * @param {String} email User email
 * @return {Promise<User>}
 */
function findByEmail(email) {
  return User.query().where('email', email).first()
}

/**
 * Create a user
 * @param {Object} attributes User attributes
 * @param {String} attributes.email User email
 * @param {String} attributes.name User name
 * @param {String} attributes.password User password
 * @param {boolean} attributes.disabled User disabled flag
 * @return {Promise<User>}
 */
async function create(attributes) {
  const user = await User.query()
    .insertAndFetch(attributes)

  return user
}

module.exports = {
  findById,
  findByEmail,
  create,
}

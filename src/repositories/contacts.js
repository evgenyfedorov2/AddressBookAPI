'use strict'

const { Contact } = require('../database/models')

/**
 * Returns all records
 * @returns {Promise<Array>}
 */
function findAll() {
  return Contact.query()
}

/**
 * Return record by id
 * @param {Number} id record id
 * @return {Promise<Contact>}
 */
function findById(id) {
  return Contact.query()
    .findById(id)
}

/**
 * Create record
 * @param {Object} attributes Contact object
 * @param {String} attributes.name Contact name
 * @param {String} attributes.breed Contact email
 * @param {Date} attributes.birthYear Contact birth year
 * @param {String} attributes.photo Contact mobile phone
 * @param {Number} attributes.userId Contact owner id
 * @return {Promise<Contact>}
 */
async function create(attributes) {
  const contact = await Contact.query()
    .insertAndFetch(attributes)

  return contact
}

module.exports = {
  findAll,
  findById,
  create,
}

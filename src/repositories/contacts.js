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
 * @param {String} attributes.email Contact email
 * @param {String} attributes.address Contact address
 * @param {Date} attributes.birthYear Contact birth year
 * @param {String} attributes.mobilePhone Contact mobile phone
 * @param {Number} attributes.userId Contact owner id
 * @return {Promise<Contact>}
 */
async function create(attributes) {
  try {
    const contact = await Contact.query().insertAndFetch(attributes)
    return contact
  }
  catch (err) {
    console.log(err)
  }
}

module.exports = {
  findAll,
  findById,
  create,
}

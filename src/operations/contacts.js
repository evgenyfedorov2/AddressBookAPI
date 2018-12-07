'use strict'

const errors = require('../utils/errors')
const contactRepository = require('../repositories/contacts')

function getAll() {
  return contactRepository.findAll()
}

async function getById(input) {
  const contact = await contactRepository.findById(input.id)
  if (!contact) {
    throw new errors.NotFoundError()
  }
  return contact
}

function createContact(input) {
  // For the sake of simplicity, we are not checking if photo is still null at this point.
  return contactRepository.create(input)
}

module.exports = {
  getAll,
  getById,
  createContact,
}

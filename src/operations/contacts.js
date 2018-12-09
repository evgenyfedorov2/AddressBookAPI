'use strict'

const errors = require('../utils/errors')
const contactRepository = require('../repositories/contacts')

async function getAll() {
  const contacts = await contactRepository.findAll()
  return contacts
}

async function getById(input) {
  const contact = await contactRepository.findById(input.id)
  if (!contact) {
    throw new errors.NotFoundError()
  }
  return contact
}

async function createContact(input) {
  // For the sake of simplicity, we are not checking if photo is still null at this point.
  const contact = await contactRepository.create(input)
  return contact
}

module.exports = {
  getAll,
  getById,
  createContact,
}

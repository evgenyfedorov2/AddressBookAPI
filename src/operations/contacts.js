'use strict'

const contactRepository = require('../repositories/contacts')

function createContact(input) {
  return contactRepository.create(input)
}

module.exports = {
  createContact,
}

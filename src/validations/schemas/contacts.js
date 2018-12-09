'use strict'

const contactId = {
  type: 'Object',
  required: true,
  properties: {
    id: { type: 'string', required: true },
  },
}

const contact = {
  type: 'Object',
  required: true,
  properties: {
    name: { type: 'string', required: true },
    email: { type: 'string', required: true },
    address: { type: 'string' },
    birthYear: { type: 'integer' },
    mobilePhone: { type: 'string' },
  },
}

module.exports = {
  contactId,
  contact,
}

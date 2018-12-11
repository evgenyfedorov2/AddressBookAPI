'use strict'

const { validate } = require('../validations')
const operations = require('../operations/contacts')
const schemas = require('../validations/schemas/contacts')

async function createContact(ctx) {
  const input = {
    name: ctx.request.body.name,
    email: ctx.request.body.email,
    address: ctx.request.body.address,
    birthYear: parseInt(ctx.request.body.birthYear),
    mobilePhone: ctx.request.body.mobilePhone,
  }
  validate(schemas.contact, input)
  const response = await operations.createContact(input)
  ctx.status = 201
  ctx.body = response
}

module.exports = {
  createContact,
}

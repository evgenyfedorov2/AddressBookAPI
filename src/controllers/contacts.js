'use strict'

const { validate } = require('../validations')
const operations = require('../operations/contacts')
const schemas = require('../validations/schemas/contacts')

async function getAll(ctx) {
  ctx.body = await operations.getAll()
  ctx.status = 200
}

async function getById(ctx) {
  const input = {
    id: ctx.params.id,
  }
  validate(schemas.contactId, input)
  ctx.body = await operations.getById(input)
  ctx.status = 200
}

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
  getAll,
  getById,
  createContact,
}

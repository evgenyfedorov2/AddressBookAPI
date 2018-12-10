'use strict'

const { validate } = require('../validations')
const operations = require('../operations/users')
const schema = require('../validations/schemas/users')

async function login(ctx) {
  const input = {
    email: ctx.request.body.email,
    password: ctx.request.body.password,
  }
  validate(schema.login, input)
  ctx.status = 200
  ctx.body = await operations.login(input)
}

async function register(ctx) {
  const input = {
    name: ctx.request.body.name,
    email: ctx.request.body.email,
    password: ctx.request.body.password,
    disabled: ctx.request.body.disabled || false,
  }
  validate(schema.register, input)
  const user = await operations.register(input)
  ctx.status = 201
  ctx.body = user
}

module.exports = {
  register,
  login,
}

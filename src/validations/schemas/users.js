'use strict'

const jwtToken = {
  type: 'Object',
  required: true,
  properties: {
    jwtToken: { type: 'string', required: true },
  },
}

const login = {
  type: 'Object',
  required: true,
  properties: {
    email: { type: 'string', required: true, format: 'email', maxLength: 80 },
    password: { type: 'string', required: true, minLength: 8, maxLength: 80 },
  },
}

const register = {
  type: 'Object',
  required: true,
  properties: {
    name: { type: 'string', pattern: '^[A-Za-z. -]+$', maxLength: 80 },
    email: { type: 'string', required: true, format: 'email', maxLength: 80 },
    password: { type: 'string', required: true, minLength: 8, maxLength: 80 },
    disabled: { type: 'boolean', required: false },
  },
}

module.exports = {
  jwtToken,
  login,
  register,
}

'use strict'

const { firebaseApp } = require('../database/firebase')

function create(attributes) {
  return firebaseApp.database().ref('contacts/').push({ ...attributes })
}

module.exports = {
  create,
}

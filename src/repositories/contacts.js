'use strict'

const { firebase } = require('../database/firebase')

async function findAll() {
  const snapshot = await firebase.database().ref('contacts').once('value')
  return snapshot.val()
}

async function findById(id) {
  const snapshot = await firebase.database().ref(`contacts/${id}`).once('value')
  return snapshot.val() || null
}

function create(attributes) {
  return firebase.database().ref('contacts/').push({
    name: attributes.name,
    email: attributes.email,
    address: attributes.address,
    birthYear: attributes.birthYear,
    mobilePhone: attributes.mobilePhone,
  })
}

module.exports = {
  findAll,
  findById,
  create,
}

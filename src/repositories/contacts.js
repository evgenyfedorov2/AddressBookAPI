'use strict'

const { firebase } = require('../database/firebase')

function findAll() {
  return firebase.database().ref('contacts').once('value')
}

async function findById(id) {
  const snapshot = await firebase.database().ref(`contacts/${id}`).once('value')
  return snapshot.val() || null
}

function create(attributes) {
  return firebase.database().ref('contacts/').push({ ...attributes })
}

module.exports = {
  findAll,
  findById,
  create,
}

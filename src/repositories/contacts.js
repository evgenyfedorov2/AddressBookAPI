'use strict'

const { firebaseApp } = require('../database/firebase')

function findAll() {
  return firebaseApp.database().ref('contacts').once('value')
}

async function findById(id) {
  const snapshot = await firebaseApp.database().ref(`contacts/${id}`).once('value')
  return snapshot.val() || null
}

function create(attributes) {
  return firebaseApp.database().ref('contacts/').push({ ...attributes })
}

module.exports = {
  findAll,
  findById,
  create,
}

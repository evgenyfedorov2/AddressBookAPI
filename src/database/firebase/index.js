'use strict'

const firebase = require('firebase')
const config = require('../../config')

const firebaseApp = firebase.initializeApp(config.databaseFirebase)

module.exports = {
  firebaseApp,
}

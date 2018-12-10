'use strict'

const firebase = require('firebase')
const config = require('../../config')

const firebaseApp = firebase.initializeApp(config.databaseFirebase, config.env)

module.exports = {
  firebaseApp,
}

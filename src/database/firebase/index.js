'use strict'

const firebase = require('firebase')
const config = require('./../../config')

firebase.initializeApp(config.databaseFirebase)

module.exports = {
  firebase,
}

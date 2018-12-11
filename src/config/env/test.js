/* eslint-disable no-process-env */
'use strict'

module.exports = {
  hostname: 'http://localhost:3000',
  logger: {
    enabled: false,
    stdout: true,
    minLevel: 'error',
  },
  databasePG: {
    connection: 'postgres://postgres@localhost:5432/addressbook-test',
  },
  databaseFirebase: {
    apiKey: 'AIzaSyB0ewvuMY0f0BL4DDCH_8MbxcQdEtXqCEY',
    authDomain: 'addressbookapi-test.firebaseapp.com',
    databaseURL: 'https://addressbookapi-test.firebaseio.com',
    projectId: 'addressbookapi-test',
    storageBucket: 'addressbookapi-test.appspot.com',
    messagingSenderId: '979005675330'
  },
}

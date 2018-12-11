'use strict'

const pkg = require('../../package')

module.exports = env => ({
  env,
  appName: pkg.name,
  version: pkg.version,
  server: {
    port: process.env.PORT || 3001,
    bodyParser: {
      patchKoa: true,
      urlencoded: true,
      text: false,
      json: true,
      multipart: false,
    },
    cors: {
      origin: '*',
      exposeHeaders: [
        'Authorization',
        'Content-Language',
        'Content-Length',
        'Content-Type',
        'Date',
        'ETag',
      ],
      maxAge: 3600,
    },
  },
  auth: {
    secret: process.env.AUTH_SECRET || 'htfq4o3bcyriq4wyvtcbyrwqv3fy53bprogc',
    saltRounds: 10,
    createOptions: {
      expiresIn: 60 * 60,
      algorithm: 'HS256',
      issuer: `com.strv.nodejs-nights.${env}`,
    },
    verifyOptions: {
      algorithm: 'HS256',
      issuer: `com.strv.nodejs-nights.${env}`,
    },
  },
  logger: {
    enabled: true,
    stdout: true,
    minLevel: 'debug',
  },
  databasePG: {
    client: 'pg',
    connection: process.env.DATABASEPB_URL
      || 'postgres://postgres@localhost:5432/addressbook-local',
    pool: {
      min: process.env.DATABASE_POOL_MIN || 0,
      max: process.env.DATABASE_POOL_MAX || 5,
    },
  },
  databaseFirebase: {
    apiKey: 'AIzaSyCJbhvkQcpYBJqcYgD9VWbaWVA53_7tVpw',
    authDomain: 'addressbookapi-afc02.firebaseapp.com',
    databaseURL: process.env.DATABASEFB_URL || 'https://addressbookapi-afc02.firebaseio.com',
    projectId: 'addressbookapi-afc02',
    storageBucket: 'addressbookapi-afc02.appspot.com',
    messagingSenderId: '842723281975',
  },
})

'use strict'

const { knex } = require('../src/database/postgresql')
const { firebaseApp } = require('../src/database/firebase')

const query = "SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname='public';"

const ignoreTableNames = [
  'knex_migrations',
  'knex_migrations_lock',
]

async function resetPGDb() {
  const tableNames = (await knex.raw(query))
    .rows
    .map(table => table[Object.keys(table)[0]])
    .filter(tableName => !ignoreTableNames.includes(tableName))
    .map(tableName => `"${tableName}"`)

  return knex.raw(`TRUNCATE ${tableNames.join()} RESTART IDENTITY CASCADE`)
}

async function resetFirebaseDb(location) {
  await firebaseApp.database().ref(location).remove()
}

module.exports = {
  resetPGDb,
  resetFirebaseDb,
}

'use strict'

const Base = require('./base')

class Contact extends Base {
  static get tableName() {
    return 'contacts'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'name',
        'breed',
        'birthYear',
      ],

      properties: {
        id: {
          type: 'integer',
        },
        name: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
        birthYear: {
          type: 'integer',
        },
        mobilePhone: {
          type: 'string',
        },
        userId: {
          type: 'integer',
        },
      },
    }
  }
}

module.exports = Contact

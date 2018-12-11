'use strict'

const request = require('supertest-koa-agent')
const app = require('../../../src/app')
const { resetFirebaseDb, resetPGDb } = require('../../helpers')

describe('Contacts', () => {
  beforeEach(resetPGDb)
  beforeEach(async () => {
    await resetFirebaseDb('contacts')
  })

  context('POST /contacts', () => {
    let userToken

    beforeEach(async () => {
      const responseUser = await request(app)
        .post('/users')
        .send({
          email: 'user@mail.com',
          password: '11111111',
        })
        .expect(201)

      userToken = responseUser.body.accessToken
    })

    it('responds with success code when created a new contact', async () => {
      const contactData = {
        name: 'John',
        mobilePhone: '123',
        birthYear: 2000,
        email: 'genius@mail.com',
        address: 'nowhere',
      }

      await request(app)
        .post('/contact')
        .set('Authorization', `jwt ${userToken}`)
        .send(contactData)
        .expect(201)
    })

    it('responds with failure when token expired', async () => {
      const contactData = {
        name: 'John',
        mobilePhone: '123',
        birthYear: 1111,
        email: 'test@mail.com',
        address: 'Earth',
      }

      await request(app)
        .post('/contact')
        .set('Authorization', `jwt ${userToken * 1000000}`)
        .send(contactData)
        .expect(401)
    })

    it('responds with failure when no auth header provided', async () => {
      const contactData = {
        name: 'John',
        mobilePhone: '123',
        birthYear: 1111,
        email: 'test@mail.com',
        address: 'Earth',
      }

      await request(app)
        .post('/contact')
        .send(contactData)
        .expect(404)
    })

    it('responds with failure when token is incorrect', async () => {
      const contactData = {
        name: 'John',
        mobilePhone: '123',
        birthYear: 1111,
        email: 'test@mail.com',
        address: 'Earth',
      }

      await request(app)
        .post('/contact')
        .set('Authorization', '')
        .send(contactData)
        .expect(404)
    })
  })
})

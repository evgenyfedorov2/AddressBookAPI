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
    let userTokenDisabled

    beforeEach(async () => {
      const responseUser = await request(app)
        .post('/users')
        .send({
          email: 'user@mail.com',
          name: 'user',
          password: '11111111',
        })
        .expect(201)

      userToken = responseUser.body.accessToken

      const responseDisabled = await request(app)
        .post('/users')
        .send({
          email: 'user1@mail.com',
          name: 'disabled',
          password: '11111111',
          disabled: true,
        })
        .expect(201)
      userTokenDisabled = responseDisabled.body.accessToken
    })
    it('fails if wrong token provided', async () => {
      await request(app)
        .get('/contacts')
        .set('Authorization', `jwt qwerty${userToken}`)
        .send()
        .expect(401)
    })

    it('fails if user is disabled', async () => {
      await request(app)
        .get('/contacts')
        .set('Authorization', `jwt ${userTokenDisabled}`)
        .send()
        .expect(401)
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
  })
})

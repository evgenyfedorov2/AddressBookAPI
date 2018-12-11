'use strict'

const request = require('supertest-koa-agent')
const { expect } = require('chai')
const app = require('../../../src/app')
const { resetPGDb } = require('../../helpers')
const usersRepository = require('../../../src/repositories/users')

describe('Users', () => {
  beforeEach(resetPGDb)

  context('POST /users', () => {
    const userData = {
      email: 'username@gmail.com',
    }

    it('responds with newly created user', async () => {
      const res = await request(app)
        .post('/users')
        .send({
          ...userData,
          password: '11111111',
        })
        .expect(201)

      expect(res.body).to.deep.include({
        ...userData,
        id: 1,
      })

      expect(res.body).to.have.all.keys([
        'name',
        'email',
        'disabled',
        'createdAt',
        'id',
        'accessToken',
      ])

      await request(app)
        .post('/session/user')
        .send({
          ...userData,
          password: '11111111',
        })
        .expect(200)
    })

    it('responds with success when logging in with correct credentials', async () => {
      await request(app)
        .post('/users')
        .send({
          ...userData,
          password: '11111111',
        })

      await request(app)
        .post('/session/user')
        .send({
          ...userData,
          password: '11111111',
        })
        .expect(200)
    })

    it('responds with failure when logging in with wrong credentials', async () => {
      await request(app)
        .post('/users')
        .send({
          ...userData,
          password: '11111111',
        })

      await request(app)
        .post('/session/user')
        .send({
          ...userData,
          password: '111111112',
        })
        .expect(401)
    })

    it('responds with error when not all required attributes are in body', async () => {
      const res = await request(app)
        .post('/users')
        .send({})
        .expect(400)

      expect(res.body).includes.keys([
        'message',
        'type',
      ])
    })

    it('response with error when trying to login with a non-existent user', async () => {
      const resp = await request(app)
        .post('/session/user')
        .send({
          ...userData,
          password: '11111111',
        })
        .expect(401)

      expect(resp.body).includes.keys([
        'message',
        'type',
      ])
    })

    it('responds with error when email is already taken', async () => {
      await usersRepository.create({
        ...userData,
        password: '111',
      })
      const res = await request(app)
        .post('/users')
        .send({
          ...userData,
          password: '11111111',
        })
        .expect(409)

      expect(res.body).includes.keys([
        'message',
        'type',
      ])
    })
  })
})

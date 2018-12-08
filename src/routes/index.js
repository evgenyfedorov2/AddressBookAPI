'use strict'

const Router = require('koa-router')
const { handleErrors, handleNotFound } = require('../middleware/errors')
const { authenticate } = require('../middleware/authentication')
const contacts = require('../controllers/contacts')
const users = require('../controllers/users')

const router = new Router()
router.use(handleErrors)

/* PUBLIC ROUTES */

router.post('/users', users.register)
router.post('/session/user', users.login)

/* PRIVATE ROUTES */

router.get('/contacts', authenticate, contacts.getAll)
router.get('/contacts/:id', authenticate, contacts.getById)
router.post('/contact', authenticate, contacts.createContact)

router.use(handleNotFound)

module.exports = router.routes()

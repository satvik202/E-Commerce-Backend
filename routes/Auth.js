const express = require('express')
const { createUser, loginUser } = require('../controller/Auth')
const router = express.Router()
// /auth is base path
router.post('/signup', createUser).post('/login', loginUser)

exports.router = router
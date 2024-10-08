const express = require('express')
const { fetchUserById, updateUser } = require('../controller/User')
const router = express.Router()
// /users is base path
router.get('/:id', fetchUserById)
      .patch('/:id', updateUser)

exports.router = router
const express = require('express')
const { fetchOrdersByUser, updateOrder, createOrder, deleteOrder } = require('../controller/Order')
const router = express.Router()
// /orders is base path
router.get('/', fetchOrdersByUser).post('/', createOrder).patch('/:id', updateOrder).delete('/:id', deleteOrder)

exports.router = router
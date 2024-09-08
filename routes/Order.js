const express = require("express");
const {
  fetchOrdersByUser,
  updateOrder,
  createOrder,
  deleteOrder,
  fetchAllOrders,
} = require("../controller/Order");
const router = express.Router();
// /orders is base path
router
  .get("/user/:user", fetchOrdersByUser)
  .post("/", createOrder)
  .patch("/:id", updateOrder)
  .delete("/:id", deleteOrder)
  .get('/', fetchAllOrders)

exports.router = router;

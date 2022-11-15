const express = require('express');
const salesRoutes = require('../controllers/sales.controller');
const { verifyKeys, validateQuantity,
  validateProduct } = require('../middlewares/sales.middlewares');

const route = express.Router();

route.post(
  '/',
  verifyKeys,
  validateProduct,
  validateQuantity,
  salesRoutes.postSale,
);

module.exports = route;

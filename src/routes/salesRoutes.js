const express = require('express');
const salesRoutes = require('../controllers/sales.controller');
const { verifyKeys, validateQuantity } = require('../middlewares/sales.middlewares');

const route = express.Router();

route.post(
  '/',
  verifyKeys,
  validateQuantity,
  salesRoutes.postSale,
);

module.exports = route;

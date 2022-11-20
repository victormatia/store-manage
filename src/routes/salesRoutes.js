const express = require('express');
const salesController = require('../controllers/sales.controller');
const { verifyKeys, validateQuantity } = require('../middlewares/sales.middlewares');

const route = express.Router();

route.get('/', salesController.findAllSales);

route.get('/:id', salesController.findSalesById);

route.delete('/:id', salesController.deleteSale);

route.post(
  '/',
  verifyKeys,
  validateQuantity,
  salesController.postSale,
);

route.put(
  '/:id',
  verifyKeys,
  validateQuantity,
  salesController.updateSale,
);

module.exports = route;

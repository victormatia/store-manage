const express = require('express');
const productsController = require('../controllers/products.controller');
const productMiddlewares = require('../middlewares/products.middlewares');

const route = express.Router();

route.get('/', productsController.findAllProducts);

route.get('/:id', productsController.findProductById);

route.post(
  '/',
  productMiddlewares.verifyKeys,
  productMiddlewares.verifyName,
  productsController.postProduct,
);

module.exports = route;

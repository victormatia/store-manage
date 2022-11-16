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

route.put(
  '/:id',
  productMiddlewares.verifyKeys,
  productMiddlewares.verifyName,
  productsController.updateProduct,
);

route.delete('/:id', productsController.deleteProduct);

module.exports = route;

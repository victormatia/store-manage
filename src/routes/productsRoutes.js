const express = require('express');
const productsController = require('../controllers/products.controller');

const route = express.Router();

route.get('/', productsController.findAllProducts);

route.get('/:id', productsController.findProductById);

module.exports = route;

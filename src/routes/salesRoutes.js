const express = require('express');
const salesRoutes = require('../controllers/sales.controller');

const route = express.Router();

route.post('/', salesRoutes.postSale);

module.exports = route;

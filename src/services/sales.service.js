const salesModel = require('../models/sales.model');
const validations = require('./validations/index');

const postSale = async (sale) => {
  const areProductsValides = await validations.validateProduct(sale);

  if (!areProductsValides) {
    return { message: 'Product not found' };
  }

  const saleId = await salesModel.postSale(sale);

  return { message: saleId };
};

module.exports = {
  postSale,
};
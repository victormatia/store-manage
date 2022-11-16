const salesModel = require('../models/sales.model');
const validations = require('./validations/index');

const findAllSales = async () => {
  const results = await salesModel.findAllSales();

  const camelize = results.map((result) => (
    {
      saleId: result.sale_id,
      date: result.date,
      productId: result.product_id,
      quantity: result.quantity,
    }
  ));

  return { message: camelize };
};

const findSalesById = async (id) => {
  const results = await salesModel.findSalesById(id);

  if (!results.length) return { message: 'Sale not found' };

  const noId = results.map((result) => (
    { date: result.date, productId: result.product_id, quantity: result.quantity }
  ));

  return { message: noId };
};

const postSale = async (sale) => {
  const areProductsValides = await validations.validateProduct(sale);

  if (!areProductsValides) {
    return { message: 'Product not found' };
  }

  const saleId = await salesModel.postSale(sale);

  return { message: saleId };
};

module.exports = {
  findAllSales,
  findSalesById,
  postSale,
};
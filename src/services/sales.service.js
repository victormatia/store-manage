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

const deleteSale = async (id) => { 
  const result = await salesModel.findSalesById(id);

  if (!result.length) return { message: 'Sale not found' };

  const affectedRows = await salesModel.deleteSale(id);

  return { message: affectedRows };
};

const updateSale = async (id, saleUpdated) => { 
  const sale = await salesModel.findSalesById(id);

  if (!sale) return { message: 'Sale not found' };

  const result = await salesModel.updateSale(id, saleUpdated);

  return { message: result };
};

module.exports = {
  findAllSales,
  findSalesById,
  postSale,
  deleteSale,
  updateSale,
};
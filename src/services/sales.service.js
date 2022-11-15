const salesModel = require('../models/sales.model');

const postSale = async (sale) => { 
  const saleId = await salesModel.postSale(sale);

  return saleId;
};

module.exports = {
  postSale,
};
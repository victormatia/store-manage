const productsModel = require('../../models/products.model');

const validateProduct = async (sale) => {
  const results = await Promise
    .all(sale.map(async ({ productId }) => productsModel.findProductById(productId)));

  const isResultValide = results.some((result) => !result);

  if (isResultValide) return false;

  return true;
};

module.exports = {
  validateProduct,  
};

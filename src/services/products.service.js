const productsModel = require('../models/products.model');

const findAllProducts = async () => {
  const result = await productsModel.findAllProducts();

  return { message: result };
};

const findProductById = async (id) => { 
  const result = await productsModel.findProductById(id);

  if (!result) return { message: 'Product not found' };

  return { message: result };
};

module.exports = {
  findAllProducts,
  findProductById,
};

const productsModel = require('../models/products.model');

const findProductByName = async (name) => { 
  const result = await productsModel.findProductByName(name);

  return { message: result };
};

const findAllProducts = async () => {
  const result = await productsModel.findAllProducts();

  return { message: result };
};

const findProductById = async (id) => { 
  const result = await productsModel.findProductById(id);

  if (!result) return { message: 'Product not found' };

  return { message: result };
};

const postProduct = async (name) => { 
  const insertId = await productsModel.postProduct(name);
  
  return insertId;
};

const updateProduct = async ({ id, name }) => {
  const result = await productsModel.updateProduct({ id, name });

  return { message: result };
};

const deleteProduct = async (id) => {
  const result = await productsModel.deleteProduct(id);

  return { message: result };
};

module.exports = {
  findProductByName,
  findAllProducts,
  findProductById,
  postProduct,
  updateProduct,
  deleteProduct,
};

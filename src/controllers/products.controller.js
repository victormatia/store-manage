const productsService = require('../services/products.service');

const findAllProducts = async (_req, res) => {
  const { message } = await productsService.findAllProducts();

  res.status(200).json(message);
};

const findProductById = async (req, res) => {
  const { id } = req.params;
  const { message } = await productsService.findProductById(id);

  if (typeof message === 'string') return res.status(404).json({ message });

  res.status(200).json(message);
};

const postProduct = async (req, res) => { 
  const { name } = req.body;
  const insertId = await productsService.postProduct(name);
  const { message } = await productsService.findProductById(insertId);

  res.status(201).json(message);
};

module.exports = {
  findAllProducts,
  findProductById,
  postProduct,
};

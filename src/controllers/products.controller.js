const productsService = require('../services/products.service');

const findProductByName = async (req, res) => { 
  const { q } = req.query;

  const { message } = await productsService.findProductByName(q);

  res.status(200).json(message);
};

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

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { message } = await productsService.findProductById(id);

  if (typeof message === 'string') return res.status(404).json({ message });

  await productsService.updateProduct({ id, name });

  const result = await productsService.findProductById(id);

  res.status(200).json(result.message);
};

const deleteProduct = async (req, res) => { 
  const { id } = req.params;

  const { message } = await productsService.findProductById(id);

  if (typeof message === 'string') return res.status(404).json({ message });

  await productsService.deleteProduct(id);

  res.status(204).end();
};

module.exports = {
  findProductByName,
  findAllProducts,
  findProductById,
  postProduct,
  updateProduct,
  deleteProduct,
};

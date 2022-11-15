const productsModel = require('../models/products.model');

const verifyKeys = (req, res, next) => { 
  const { body } = req;

  if (!body.every((sale) => 'productId' in sale)) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  if (!body.every((sale) => 'quantity' in sale)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  next();
};

const validateProduct = async (req, res, next) => {
  const { body } = req;

  // refatorar 
  const results = await Promise
    .all(body.map(async ({ productId }) => productsModel.findProductById(productId)));
  
  const isResultValide = results.some((result) => !result);

  if (isResultValide) return res.status(404).json({ message: 'Product not found' });
  next();
};

const validateQuantity = (req, res, next) => { 
  const { body } = req;

  if (body.some(({ quantity }) => quantity <= 0)) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = {
  verifyKeys,
  validateProduct,
  validateQuantity,
};
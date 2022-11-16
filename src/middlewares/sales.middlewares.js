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

const validateQuantity = (req, res, next) => { 
  const { body } = req;

  if (body.some(({ quantity }) => quantity <= 0)) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = {
  verifyKeys,
  validateQuantity,
};
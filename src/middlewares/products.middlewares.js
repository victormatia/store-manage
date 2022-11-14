const verifyKeys = (req, res, next) => { 
  const { body } = req;

  if ('name' in body) return next();

  res.status(400).json({ message: '"name" is required' });
};

const verifyName = (req, res, next) => { 
  const { name } = req.body;

  if (name.length >= 5) return next();

  res.status(422).json({ message: '"name" length must be at least 5 characters long' });
};

module.exports = {
  verifyKeys,
  verifyName,
};

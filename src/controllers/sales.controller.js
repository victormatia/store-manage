const salesService = require('../services/sales.service');

const postSale = async (req, res) => {
  const { body } = req;

  const { message } = await salesService.postSale(body);

  if (typeof message === 'string') return res.status(404).json({ message });

  res.status(201).json({
    id: message,
    itemsSold: body,
  });
};

module.exports = {
  postSale,
};

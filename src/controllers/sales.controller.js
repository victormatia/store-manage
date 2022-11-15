const salesService = require('../services/sales.service');

const postSale = async (req, res) => { 
  const { body } = req;

  const saleId = await salesService.postSale(body);

  res.status(201).json({
    id: saleId,
    itemsSold: body,
  });
};

module.exports = {
  postSale,
};

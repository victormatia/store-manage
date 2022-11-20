const salesService = require('../services/sales.service');

const findAllSales = async (_req, res) => {
  const { message } = await salesService.findAllSales();

  res.status(200).json(message);
};

const findSalesById = async (req, res) => {
  const { id } = req.params;
  const { message } = await salesService.findSalesById(id);

  if (typeof message === 'string') return res.status(404).json({ message });

  res.status(200).json(message);
};

const postSale = async (req, res) => {
  const { body } = req;

  const { message } = await salesService.postSale(body);

  if (typeof message === 'string') return res.status(404).json({ message });

  res.status(201).json({
    id: message,
    itemsSold: body,
  });
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const { message } = await salesService.deleteSale(id);

  if (typeof message === 'string') return res.status(404).json({ message });
  
  res.status(204).end();
};

const updateSale = async (req, res) => { 
  const { id } = req.params;
  const { body } = req;

  const { message } = await salesService.updateSale(id, body);

  if (typeof message === 'string') return res.status(404).json({ message });

  res.status(200).json({
    saleId: id,
    itemsUpdated: body,
  });
}; 

module.exports = {
  findAllSales,
  findSalesById,
  postSale,
  deleteSale,
  updateSale,
};

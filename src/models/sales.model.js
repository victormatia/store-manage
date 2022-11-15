const connection = require('./db/connection');

const postSaleProduct = async ({ insertId, productId, quantity }) => {
  const result = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
    [insertId, productId, quantity],
  );

  return result;
};

const postSale = async (sale) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUE ()',
  );
  await Promise.all(sale.map(async ({ productId, quantity }) =>
    postSaleProduct({ insertId, productId, quantity })));

  return insertId;
};

module.exports = {
  postSale,
};
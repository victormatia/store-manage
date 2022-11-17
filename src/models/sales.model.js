const connection = require('./db/connection');

const findAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT
      sp.sale_id, s.date,
      sp.product_id,
      sp.quantity
    FROM
      StoreManager.sales_products AS sp
    INNER JOIN
      StoreManager.sales AS s
    ON sp.sale_id = s.id`,
  );

  console.log(result);

  return result;
};

const findSalesById = async (id) => {
  const [result] = await connection.execute(
    `SELECT
      sp.sale_id, s.date,
      sp.product_id,
      sp.quantity
    FROM
      StoreManager.sales_products AS sp
    INNER JOIN
      StoreManager.sales AS s
    ON sp.sale_id = s.id
    WHERE sale_id = ?`,
    [id],
  );

  return result;
};

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

const deleteSale = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );

  await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );
};

module.exports = {
  findAllSales,
  findSalesById,
  postSale,
  deleteSale,
};
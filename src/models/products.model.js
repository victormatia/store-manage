const connection = require('./db/connection');

const findAllProducts = async () => { 
  const [allProducts] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id',
  );
  
  return allProducts;
};

const findProductById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );

  return product;
};

const postProduct = async (name) => { 
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [name],
  );

  return insertId;
};

const updateProduct = async ({ id, name }) => {
  const [{ changedRows }] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
  );

  return changedRows;
};

const deleteProduct = async (id) => {
  const result = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );

  return result;
};

module.exports = {
  findAllProducts,
  findProductById,
  postProduct,
  updateProduct,
  deleteProduct,
};

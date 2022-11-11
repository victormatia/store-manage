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

module.exports = {
  findAllProducts,
  findProductById,
};

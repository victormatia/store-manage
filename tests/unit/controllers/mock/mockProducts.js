const allProductsResponse = {
  message: [
    { id: 1, name: 'Martelo de Thor' },
    { id: 2, name: 'Traje de encolhimento' },
    { id: 3, name: 'Escudo do Capitão América' }
  ],
};

const productTwoResponse = {
  message: { id: 2, name: 'Traje de encolhimento' },
};

const productUpdated = {
  message: { id: 2, name: 'Traje de crescimento' },
};

const notFoundResponse = {
  message: 'Product not found',
};

const newProduct = {
  id: 999,
  name: 'Arco de combate com felchas multifuncionais',
};

module.exports = {
  allProductsResponse,
  productTwoResponse,
  notFoundResponse,
  newProduct,
  productUpdated,
}

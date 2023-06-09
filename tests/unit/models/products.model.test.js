const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/products.model');
const productsResponse = require('./mock/mockProductsResponse');
const connection = require('../../../src/models/db/connection');

const { allProductsResponse, productsOne } = productsResponse;

describe('Aplica casos de testes a productsModel', function () { 
  afterEach(sinon.restore)

  it('Verificado se retorna todos os produtos disponíveis', async function () {
    sinon.stub(connection, 'execute').resolves(allProductsResponse);
    const result = await productsModel.findAllProducts();
    expect(result).to.be.deep.equal(allProductsResponse[0]);
  });
  
  it('Verificado se retorna um produto baseado em um id', async function () {
    sinon.stub(connection, 'execute').resolves(productsOne);
    const result = await productsModel.findProductById(1);
    expect(result).to.be.deep.equal(productsOne[0][0]);
  });

  it('Verificado se retorna "product not found", quando o id não é encontrado', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
    const result = await productsModel.findProductById(13);
    expect(result).to.be.equal(undefined);
  });

  it('Verificado se é possível adicionar um novo produto ao banco de dados', async function () { 
    sinon.stub(connection, 'execute').resolves([{ insertId: 13 }]);
    const result = await productsModel.postProduct('new product');
    expect(result).to.be.equal(13)
  });

  it('Verificado se é possível atualizar o nome de um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ changedRows: 1 }])
    const result = await productsModel.updateProduct(20);
    expect(result).to.be.equal(1);
  });

  it('Verificado se é possível apagar um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }])
    const result = await productsModel.deleteProduct(20);
    expect(result).to.be.equal(1);
  });
});

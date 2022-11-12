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

  it('Verificado se retorna "product not found", quando i id não é encontrado', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
    const result = await productsModel.findProductById(13);
    expect(result).to.be.equal(undefined);
  });
});

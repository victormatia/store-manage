const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../src/services/products.service');
const productsModel = require('../../../src/models/products.model');
const { allProducts, productTwo } = require('./mock/mockProducts');

describe('Aplica casos de testes a productsService', function () { 
  afterEach(sinon.restore);
    
  it('Verificado se retorna todos os produtos disponíveis', async function () {
    sinon.stub(productsModel, 'findAllProducts').resolves(allProducts );
    const result = await productsService.findAllProducts();

    expect(result.message).to.be.deep.equal(allProducts);
  });

  it('Verificado se retorna um produto baseado em um id', async function () {
    sinon.stub(productsModel, 'findProductById').resolves(productTwo );
    const result = await productsService.findProductById(2);

    expect(result.message).to.be.deep.equal(productTwo);
  });

  it('Verificado se retorna "Product not found", quando i id não é encontrado', async function () {
    sinon.stub(productsModel, 'findProductById').resolves(undefined);
    const result = await productsService.findProductById(20);

    expect(result.message).to.be.deep.equal('Product not found');
  });

  it('Verificado se é possível adicionar um novo produto', async function () {
    sinon.stub(productsModel, 'postProduct').resolves(13);
    const result = await productsService.postProduct('new product');

    expect(result).to.be.equal(13);
  });

  it('Verificado se é possível atualizar o nome de um produto', async function () {
    sinon.stub(productsModel, 'updateProduct').resolves(1)
    const result = await productsService.updateProduct(20);
    expect(result.message).to.be.equal(1);
  });

  it('Verificado se é possível apagar um produto', async function () {
    sinon.stub(productsModel, 'deleteProduct').resolves(1)
    const result = await productsService.deleteProduct(20);
    expect(result.message).to.be.equal(1);
  });
});

const chai = require('chai');
const sinon = require('sinon');
const productsController = require('../../../src/controllers/products.controller');
const productsService = require('../../../src/services/products.service');
const sinonChai = require('sinon-chai')
const { allProductsResponse, productTwoResponse, notFoundResponse, newProduct, productUpdated } = require('./mock/mockProducts');

const { expect } = chai

chai.use(sinonChai);

describe('Aplica casos de testes a productsController', function () { 
  afterEach(sinon.restore);

  it('Verificado se a requisição retorna todos os produtos disponíveis e o statusCode correto', async function () { 
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'findAllProducts').resolves(allProductsResponse);

    await productsController.findAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProductsResponse.message);
  });

  it('Verificado se a requisição retorna um produto disponível baseado em um id e o statusCode correto', async function () {
    const res = {};
    const req = { params: { id: 2 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'findProductById').resolves(productTwoResponse);

    await productsController.findProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productTwoResponse.message);
  });

  it('Verificado se a requisição retorna "Product not found", quando o id não é encontrado, e o statusCode correto', async function () {
    const res = {};
    const req = { params: { id: 20 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'findProductById').resolves(notFoundResponse);

    await productsController.findProductById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(notFoundResponse);
  });

  it('Verificado se é possível cadastrar um novo produto', async function () {
    const res = {};
    const req = { body: { "name": "Arco de combate com felchas multifuncionais" } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'postProduct').resolves(999);
    sinon.stub(productsService, 'findProductById').resolves({ message: newProduct});

    await productsController.postProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProduct);
  });

  it('Verificado se é possível atualizar o nome de um produto', async function () {
    const res = {};
    const req = { body: { "name": "Traje de crescimento" }, "params": { "id": 2 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'findProductById')
      .onFirstCall().resolves(productTwoResponse)
      .onSecondCall().resolves(productUpdated);
    
    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200)
    expect(res.json).to.have.been.calledWith(productUpdated.message);
  });

  it('Verificado se não é possível atualizar o nome de um produto, quando o id não é encontrado', async function () {
    const res = {};
    const req = { body: { "name": "Traje de crescimento" }, "params": { "id": 999 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'findProductById')
      .onFirstCall().resolves(notFoundResponse)
      .onSecondCall().resolves(productUpdated);

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(404)
    expect(res.json).to.have.been.calledWith(notFoundResponse);
  });

  it('Verificado se é possível apagar um produto', async function () {
    const res = {};
    const req = { "params": { "id": 2 } };

    res.status = sinon.stub().returns(res);
    res.end = sinon.stub().returns();

    sinon.stub(productsService, 'findProductById').resolves(productTwoResponse);

    await productsController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(204)
    // expect(res.end).to.have.been.calledOnce()
  });

  it('Verificado se não é possível apagar um produto, , quando o id não é encontrado', async function () {
    const res = {};
    const req = { "params": { "id": 2 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'findProductById').resolves(notFoundResponse);

    await productsController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(404)
    expect(res.json).to.have.been.calledWith(notFoundResponse)
  });
});
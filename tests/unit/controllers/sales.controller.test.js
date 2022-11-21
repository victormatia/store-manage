const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const salesController = require('../../../src/controllers/sales.controller');
const salesService = require('../../../src/services/sales.service');
const { saleUpdatedResponse, allSales, sale } = require('./mock/mockSales');

const { expect } = chai;

chai.use(sinonChai);

describe('Aplica casos de testes a salesController', function () {
  afterEach(sinon.restore);

  it('Verifica se retorna todas as vendas', async function () { 
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'findAllSales').resolves({ message: allSales });

    await salesController.findAllSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSales);
  });

  it('Verifica se retorna apenas uma venda', async function () {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'findSalesById').resolves({ message: sale });

    await salesController.findSalesById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(sale);
  });

  it('Verifica se é possível atualizar uma venda', async function () { 
    const body = [
      {
        "productId": 1,
        "quantity": 10
      },
      {
        "productId": 2,
        "quantity": 50
      }
    ]

    const res = {};
    const req = { params: { id: 1 }, body };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'updateSale').resolves({ message: 2 });

    await salesController.updateSale(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleUpdatedResponse);
  });

  it('Verifica se retorna "Sale not found", quando o id é invalido', async function () {
    const body = [
      {
        "productId": 1,
        "quantity": 10
      },
      {
        "productId": 2,
        "quantity": 50
      }
    ]

    const res = {};
    const req = { params: { id: 999 }, body };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'updateSale').resolves({ message: 'Sale not found' });

    await salesController.updateSale(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });
});
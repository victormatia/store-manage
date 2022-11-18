const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../src/services/sales.service');
const salesModel = require('../../../src/models/sales.model');

const { allSalesResponse, allSales, sale, salesResponse } = require('./mock/mockSales');

describe('Aplica casos de teste a salesService', function () { 
  afterEach(sinon.restore);

  it('Verificado se retorna todas as vendas existentes', async function () {
    sinon.stub(salesModel, 'findAllSales').resolves(allSalesResponse);

    const result = await salesService.findAllSales();

    expect(result.message).to.be.deep.equal(allSales);
  });

  it('Verificado se retorna uma venda baseada em um id', async function () {
    sinon.stub(salesModel, 'findSalesById').resolves(salesResponse);

    const result = await salesService.findSalesById(1);

    expect(result.message).to.be.deep.equal(sale);
  });

  it('Verificado se é possível postar um nova venda', async function () {
    const sale = [
      {
        "productId": 3,
        "quantity": 1
      },
      {
        "productId": 3,
        "quantity": 1
      }
    ]

    sinon.stub(salesModel, 'postSale').resolves(1);

    const result = await salesService.postSale(sale);

    expect(result.message).to.be.equal(1);
  });

  it('Verificado se é possível apagar um venda', async function () {
    sinon.stub(salesModel, 'deleteSale').resolves(1);

    const result = await salesService.deleteSale(1);

    expect(result.message).to.be.equal(1);
  });

  it('Verificado se é possível atualizar um venda', async function () {
    const saleId = 1;
    const saleUpdated = [
      {
        "productId": 1,
        "quantity": 100
      },
      {
        "productId": 2,
        "quantity": 500
      }
    ];

    // sinon.stub(salesModel, 'updateSale').resolves(2);

    const result = await salesService.updateSale(saleId, saleUpdated);

    expect(result.message).to.be.equal(2);
  });
});
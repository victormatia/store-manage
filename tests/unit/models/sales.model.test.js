const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/db/connection');
const salesModel = require('../../../src/models/sales.model');

const { allSalesResponse, saleResponse } = require('./mock/mockSalesResponse');

const sale = [
  {
    "productId": 3,
    "quantity": 1
  },
  {
    "productId": 3,
    "quantity": 1
  }
];

describe('Aplica casos de teste a salesModel', function () {
  afterEach(sinon.restore);

  it('Verificado se retorna todas as vendas existentes', async function () { 
    sinon.stub(connection, 'execute').resolves(allSalesResponse);

    const result = await salesModel.findAllSales();

    expect(result).to.be.deep.equals(allSalesResponse[0]);
  });

  it('Verificado se retorna uma venda baseado em um id', async function () {
    sinon.stub(connection, 'execute').resolves(saleResponse);

    const result = await salesModel.findSalesById(12);
    expect(result).to.be.deep.equals(saleResponse[0]);
  });

  it('Verificado se é possível adicionar uma nova venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 2 }]);

    const result = await salesModel.postSale(sale);
    expect(result).to.be.equal(2);
  });

  it('Verificado se é possível apagar uma venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 2 }]);

    const result = await salesModel.deleteSale(1);

    expect(result).to.be.equal(2);
  });

  it('Verificado se é possível atualizar uma venda', async function () {
    const saleId = 1
    const saleUpdated = [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ];

    sinon.stub(connection, 'execute').resolves([{ changedRows: 1 }]);

    const result = await salesModel.updateSale(saleId , saleUpdated);

    expect(result).to.be.deep.equal(2);
  });
});
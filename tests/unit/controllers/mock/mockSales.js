const allSalesResponse = [
  {
    sale_id: 1,
    date: '2022 - 11 - 18T19: 11: 53.000Z',
    product_id: 1,
    quantity: 1
  },
  {
    sale_id: 2,
    date: '2022 - 11 - 18T19: 11: 53.000Z',
    product_id: 3,
    quantity: 15
  }
];

const salesResponse = [
  {
    sale_id: 1,
    date: '2022 - 11 - 18T19: 11: 53.000Z',
    product_id: 1,
    quantity: 1
  },
];

const sale = [
  {
    date: '2022 - 11 - 18T19: 11: 53.000Z',
    productId: 1,
    quantity: 1
  },
];

const allSales = [
  {
    saleId: 1,
    date: '2022 - 11 - 18T19: 11: 53.000Z',
    productId: 1,
    quantity: 1
  },
  {
    saleId: 2,
    date: '2022 - 11 - 18T19: 11: 53.000Z',
    productId: 3,
    quantity: 15
  }
];

const saleUpdatedResponse = {
  "saleId": 1,
  "itemsUpdated": [
    {
      "productId": 1,
      "quantity": 10
    },
    {
      "productId": 2,
      "quantity": 50
    }
  ]
};

module.exports = {
  allSalesResponse,
  allSales,
  salesResponse,
  sale,
  saleUpdatedResponse,
};
const fs = require('fs')
const path = require('path')

const formatProductPrices = function (product) {
  const priceWithDiscount =
    product.price - product.price * (product.discount / 100)
  product.priceWithDiscount = `$ ${priceWithDiscount.toLocaleString('es', {
    minimumFractionDigits: 2,
  })}`

  product.price = `$ ${product.price.toLocaleString('es', {
    minimumFractionDigits: 2,
  })}`

  product.discount = product.discount.toLocaleString('es')

  return product
}
const formatProductsPrices = function (products) {
  return products.map((product) => formatProductPrices(product))
}

const db = {
  products: {
    find: () => {
      const productsFilePath = path.join(
        __dirname,
        '../data/productsDataBase.json'
      )

      const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))

      return products
    },
    findById: (id) => {
      const productsFilePath = path.join(
        __dirname,
        '../data/productsDataBase.json'
      )

      const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))
      const product = products.find((product) => product.id == id)

      return product
    },
  },
}

module.exports = db

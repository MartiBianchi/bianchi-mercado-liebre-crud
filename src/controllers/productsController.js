const productServices = require('../services/productService')

const controller = {
  index: (req, res) => {
    const products = productServices.getAllProducts()

    res.render('products', { products })
  },
}

module.exports = controller

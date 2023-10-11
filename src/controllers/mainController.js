const productServices = require('../services/productService')

const controller = {
  index: (req, res) => {
    const visitedProducts = productServices.getVisitedProducts()
    const inSaleProducts = productServices.getInSaleProducts()

    res.render('index', {
      visitedProducts,
      inSaleProducts,
    })
  },
}

module.exports = controller

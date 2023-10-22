const productServices = require('../services/productsServices')
const usersServices = require('../services/usersServices')

const controller = {
  login: (req, res) => {
    res.render('login')
  },
  auth: (req, res) => {
    res.redirect('/')
  },
  index: (req, res) => {
    const visitedProducts = productServices.getVisitedProducts()
    const inSaleProducts = productServices.getInSaleProducts()

    res.render('index', {
      visitedProducts,
      inSaleProducts,
      // name: data.name,
      // email: data.email,/
    })
  },
  search: (req, res) => {
    const keywords = req.query.keywords
    const foundProducts = productServices.searchProducts(keywords)

    res.render('results', { foundProducts })
  },
}

module.exports = controller

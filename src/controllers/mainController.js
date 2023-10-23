const productServices = require('../services/productsServices')
const usersServices = require('../services/usersServices')

const controller = {
  login: (req, res) => {
    res.render('login')
  },
  auth: (req, res) => {
    const userToLogin = usersServices.getUserByField('email', req.body.email)

    req.session.userLogged = userToLogin

    console.log('Desde auth', req.session)

    res.redirect('/')
  },
  index: (req, res) => {
    const { firstName, email } = req.session.userLogged

    const visitedProducts = productServices.getVisitedProducts()
    const inSaleProducts = productServices.getInSaleProducts()

    res.render('index', {
      visitedProducts,
      inSaleProducts,
      firstName,
      email,
    })
  },
  search: (req, res) => {
    const keywords = req.query.keywords
    const foundProducts = productServices.searchProducts(keywords)

    res.render('results', { foundProducts })
  },
}

module.exports = controller

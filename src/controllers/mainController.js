const bcryptjs = require('bcryptjs')

const productServices = require('../services/productsServices')
const usersServices = require('../services/usersServices')

const controller = {
  login: (req, res) => {
    res.render('login')
  },
  auth: (req, res) => {
    const userToLogin = usersServices.getUserByField('email', req.body.email)

    if (userToLogin) {
      const validPassword = bcryptjs.compareSync(
        req.body.password,
        userToLogin.password
      )

      if (validPassword) {
        delete userToLogin.password
        req.session.userLogged = userToLogin

        return res.redirect('/')
      }

      return res.render('login', {
        errors: {
          password: {
            msg: 'La contraseña ingresada no es correcta',
          },
        },
      })
    }

    return res.render('login', {
      errors: {
        email: {
          msg: 'El correo electrónico ingresado es inválido',
        },
      },
    })
  },
  index: (req, res) => {
    const visitedProducts = productServices.getVisitedProducts()
    const inSaleProducts = productServices.getInSaleProducts()

    res.render('index', {
      visitedProducts,
      inSaleProducts,
    })
  },
  search: (req, res) => {
    const keywords = req.query.keywords
    const foundProducts = productServices.searchProducts(keywords)

    res.render('results', { foundProducts })
  },
}

module.exports = controller

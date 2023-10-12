const productServices = require('../services/productsServices')

const controller = {
  index: (req, res) => {
    const products = productServices.getAllProducts()

    res.render('products', { products })
  },
  detail: (req, res) => {
    const id = req.params.id
    const product = productServices.getProduct(id)

    res.render('detail', { product })
  },
  create: (req, res) => {
    res.render('product-create-form')
  },
  store: (req, res) => {
    const product = req.body
    console.log(product)
    res.redirect('/products')
  },
  edit: (req, res) => {
    const id = req.params.id
    const product = productServices.getProduct(id)

    res.render('product-edit-form', { product })
  },
  update: (req, res) => {
    const product = req.body
    console.log(product)
    res.redirect('/products')
  },
}

module.exports = controller

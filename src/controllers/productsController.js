const productServices = require("../services/productsServices");

const controller = {
  index: (req, res) => {
    const products = productServices.getAllProducts();

    res.render("products", { products });
  },
  detail: (req, res) => {
    const id = req.params.id;
    const product = productServices.getProduct(id);

    res.render("detail", { product });
  },
  create: (req, res) => {
    res.render("product-create-form");
  },
  store: (req, res) => {
    const product = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: Number(req.body.price),
      discount: Number(req.body.discount),
      image: req.file ? req.file.filename : "default-image.jpg",
    };

    productServices.createProduct(product);

    res.redirect("/products");
  },
  edit: (req, res) => {
    const id = req.params.id;
    const product = productServices.getProduct(id);

    res.render("product-edit-form", { product });
  },
  update: (req, res) => {
    const product = req.body;
    const id = req.params.id;
    const image = req.file
      ? req.file.filename
      : productServices.getProduct(id).image;

    product.image = image;
    productServices.updateProduct(id, product);

    res.redirect("/products");
  },
  destroy: (req, res) => {
    const id = req.params.id;

    productServices.deleteProduct(id);

    res.redirect("/products");
  },
};

module.exports = controller;

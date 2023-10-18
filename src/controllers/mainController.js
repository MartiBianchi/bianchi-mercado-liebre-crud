const productServices = require("../services/productsServices");

const controller = {
  login: (req, res) => {
    res.render("login");
  },
  auth: (req, res) => {
    res.send("no hay errores");
  },
  index: (req, res) => {
    const visitedProducts = productServices.getVisitedProducts();
    const inSaleProducts = productServices.getInSaleProducts();

    res.render("index", {
      visitedProducts,
      inSaleProducts,
    });
  },
  search: (req, res) => {
    const keywords = req.query.keywords;
    const foundProducts = productServices.searchProducts(keywords);

    res.render("results", { foundProducts });
  },
};

module.exports = controller;

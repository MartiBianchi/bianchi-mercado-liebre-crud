const productServices = require("../services/productsServices");
const usersServices = require("../services/usersServices");

const controller = {
  login: (req, res) => {
    res.render("login");
  },
  auth: (req, res) => {
    const email = req.body.email;

    let userToLogin = usersServices.getUserByEmail(email);

    req.session.save((err) => {
      if (err) {
        // Maneja el error si ocurre
        console.error(err);
      }

      // Establece una variable de sesión
      req.session.userLogged = userToLogin;

      console.log(req.session);

      res.redirect("/");
    });
  },
  index: (req, res) => {
    const visitedProducts = productServices.getVisitedProducts();
    const inSaleProducts = productServices.getInSaleProducts();

    req.session.regenerate(function (err) {
      // session updated
      if (err) {
        // Maneja el error si ocurre
        console.error(err);
      }
      const data = req.session;

      console.log(data);

      res.render("index", {
        visitedProducts,
        inSaleProducts,
        // name: data.name,
        // email: data.email,/
      });
    });
  },
  search: (req, res) => {
    const keywords = req.query.keywords;
    const foundProducts = productServices.searchProducts(keywords);

    res.render("results", { foundProducts });
  },
};

module.exports = controller;

const usersServices = require("../services/usersServices");

const usersController = {
  myProfile: (req, res) => {
    const id = req.params.id;
    const user = usersServices.getUser(id);

    return res.render("profile", { user });
  },
  crud: (req, res) => {
    const users = usersServices.getAllUsers();

    res.render("users-crud", { users });
  },
  myProfileEdit: (req, res) => {
    const id = req.params.id;
    const user = usersServices.getUser(id);
    res.render("profile-edit", { user });
  },
  create: (req, res) => {
    res.render("users-create");
  },
  update: (req, res) => {
    const user = req.body;
    const id = req.params.id;
    const profilePicture = req.file
      ? req.file.filename
      : usersServices.getUser(id).profilePicture;
    user.profilePicture = profilePicture;
    usersServices.updateUser(id, user);
    res.redirect("/home");
  },
  destroy: (req, res) => {
    const user = req.body;
    const id = req.params.id;
    const profilePicture = req.file
      ? req.file.filename
      : usersServices.getUser(id).profilePicture;
    user.profilePicture = profilePicture;
    usersServices.deleteUser(id);
    res.redirect("/users/crud");
  },
};

module.exports = usersController;

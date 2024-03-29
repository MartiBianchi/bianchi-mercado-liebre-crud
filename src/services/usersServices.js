const db = require("../data/db");

const usersServices = {
  getAllUsers: () => {
    return db.users.findAll();
  },
  getUser: (id) => {
    const user = db.users.findById(id);

    return user;
  },
  getUserByField: (field, text) => {
    const user = db.users.findByField(field, text);

    return user;
  },
  createUser: (user) => {
    db.users.create(user);
  },
  updateUser: (id, user) => {
    db.users.update(id, user);
  },
  deleteUser: (id) => {
    db.users.delete(id);
  },
};

module.exports = usersServices;

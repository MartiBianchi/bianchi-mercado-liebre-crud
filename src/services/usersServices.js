const db = require("../data/db");

const usersServices = {
  getUserByEmail: (email) => {
    const user = db.users.findByEmail(email);
    return user;
  },
};

module.exports = usersServices;

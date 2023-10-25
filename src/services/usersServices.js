const db = require('../data/db')

const usersServices = {
  getUserByField: (field, text) => {
    const user = db.users.findByField(field, text)
    return user
  },
}

module.exports = usersServices

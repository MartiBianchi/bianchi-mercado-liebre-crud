const bcryptjs = require('bcryptjs')

const usersServices = require('../services/usersServices')

const controller = {
  crud: (req, res) => {
    const users = usersServices.getAllUsers()

    res.render('users-crud', { users })
  },
  create: (req, res) => {
    res.render('user-create')
  },
  store: (req, res) => {
    const { firstName, lastName, email, password, accessType, image } = req.body

    const user = {
      firstName,
      lastName,
      email,
      password: bcryptjs.hashSync(password, 10),
      accessType,
      image: req.file ? req.file.filename : 'image-default.jpg',
    }

    const userInDB = usersServices.getUserByField('email', req.body.email)

    if (userInDB) {
      return res.render('user-create', {
        errors: {
          email: {
            msg: 'Este correo electrónico ya ha sido registrado',
          },
        },
        oldData: req.body,
      })
    }

    usersServices.createUser(user)

    res.redirect('/users/crud')
  },
  detail: (req, res) => {
    const id = req.params.id
    const user = usersServices.getUser(id)

    res.render('user-detail', { user })
  },
  edit: (req, res) => {
    const id = req.params.id
    const user = usersServices.getUser(id)

    res.render('user-edit', { user })
  },
  update: (req, res) => {
    const { id } = req.params
    const { firstName, lastName, email, password } = req.body
    const user = {
      firstName,
      lastName,
      email,
    }

    if (!password.length == 0) {
      user.password = bcryptjs.hashSync(password, 10)
    }

    user.image = req.file ? req.file.filename : usersServices.getUser(id).image

    usersServices.updateUser(id, user)

    res.redirect('/users/crud')
  },
  delete: (req, res) => {
    const { id } = req.params
    const user = usersServices.getUser(id)

    res.render('user-delete', { user })
  },
  destroy: (req, res) => {
    const { id } = req.params
    const user = req.body

    const image = req.file ? req.file.filename : usersServices.getUser(id).image
    user.image = image

    usersServices.deleteUser(id)

    res.redirect('/users/crud')
  },
}

module.exports = controller

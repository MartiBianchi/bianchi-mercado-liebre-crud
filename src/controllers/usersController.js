const usersServices = require('../services/usersServices')

const controller = {
    crud: (req, res) => {
        const users = usersServices.getAllUsers()

        res.render('users-crud', { users })
    },
    create: (req, res) => {
        res.render('users-create')
    },
    store: (req, res) => {
        const {firstName, lastName, email, password, accessType, profilePicture} = req.body

        const user = {
            firstName,
            lastName,
            email,
            password,
            accessType,
            profilePicture: req.file ? req.file.filename : profilePicture,
        }

        const userInDB = usersServices.getUserByField('email', req.body.email);

        if (userInDB) {
          return res.render('users-create', {
            errors: {
              email: {
                msg: 'Este correo electrónico ya ha sido registrado',
              },
            },
            oldData: req.body,
          });
        }

        usersServices.createUser(user);

        res.redirect('/users/crud');
    }
}

module.exports = controller
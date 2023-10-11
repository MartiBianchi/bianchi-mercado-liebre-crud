const express = require('express')
const router = express.Router()

const productsController = require('../controllers/productsController')

/*** GET ALL PRODUCTS ***/
router.get('/', productsController.index)

module.exports = router

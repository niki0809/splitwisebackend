const { get } = require('mongoose')
const [addUser,addUser2,getUserByEmail] = require('../../controllers/userController/user')
const authMiddleware = require('../../midleware/auth')
const express = require ('express')
const router = express.Router()

router.get('/user',authMiddleware,addUser)
router.get('/user/:email',authMiddleware,getUserByEmail)
module.exports = router
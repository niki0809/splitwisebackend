const express = require ('express')
const router = express.Router()
const [createGroup,getGroups] = require('../../controllers/groupController/group')
const authMiddleware = require('../../midleware/auth')
router.post('/addgroup',authMiddleware, createGroup)
router.get('/getgroups',authMiddleware,getGroups)
module.exports = router
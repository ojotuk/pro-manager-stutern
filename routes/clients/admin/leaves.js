const express = require('express')
const moment = require('moment')
const momentTimezone = require('moment-timezone')
const { requireJWT } = require('../../../middleware/auth')
const Controller =require('../../../controller/client/admin/Leave')
const router = express.Router()


//C
router.get('/app/v2/004/leave/', requireJWT, Controller.viewLeaves)


//Get an employee leave profile
router.get('/app/v2/004/leave/:id', requireJWT,Controller.approveLeave)




module.exports = router

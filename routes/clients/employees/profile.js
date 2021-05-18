const express = require('express')
const moment = require('moment')
const momentTimezone = require('moment-timezone')
const { requireJWT } = require('../../../middleware/auth')
const Controller =require('../../../controller/client/employees/Profile')
const router = express.Router()


//apply leave
router.get('/app/v2/005/my-profile', requireJWT, Controller.myProfile)





module.exports = router

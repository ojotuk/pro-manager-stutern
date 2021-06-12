const express = require('express')
const moment = require('moment')
const momentTimezone = require('moment-timezone')
const { requireJWT } = require('../../../middleware/auth')
const Controller =require('../../../controller/client/employees/TimeSheet')
const router = express.Router()


//C
router.post('/app/v2/004/timesheet/add', requireJWT, Controller.addTimeSheet);





module.exports = router

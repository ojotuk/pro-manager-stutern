const express = require('express')
const moment = require('moment')
const momentTimezone = require('moment-timezone')
const { requireJWT } = require('../../../middleware/auth')
const Controller =require('../../../controller/client/admin/Attendance')
const router = express.Router()


//C
router.get('/app/v2/004/attendance/all', requireJWT, Controller.viewAttendance)





module.exports = router

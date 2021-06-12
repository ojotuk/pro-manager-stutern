const express = require('express')
const moment = require('moment')
const momentTimezone = require('moment-timezone')
const { requireJWT } = require('../../../middleware/auth')
const Controller =require('../../../controller/client/admin/TimeSheet');
const Controller2 = require('./../../../controller/client/admin/Employees')
const router = express.Router()


//C
router.post('/app/v2/004/timesheet/add', requireJWT, Controller.addTimeSheet, Controller2.getEmployees);





module.exports = router

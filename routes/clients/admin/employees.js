const express = require('express')
const moment = require('moment')
const momentTimezone = require('moment-timezone')
const { requireJWT } = require('../../../middleware/auth')
const Controller =require('../../../controller/client/admin/Employees')
const router = express.Router()


//Client Get all Employees
router.get('/app/v2/004/all-employees', requireJWT, Controller.getEmployees)


//Get an emplyee profile
router.get('/app/v2/004/employee/profile/:id', requireJWT,Controller.getEmployee)
// router.get('/app/v2/004/employee/profile/:id', requireJWT,Controller.getEmployee)




module.exports = router

const express = require('express')
const moment = require('moment')
const momentTimezone = require('moment-timezone')
const { requireJWT } = require('../../../middleware/auth')
const Controller =require('../../../controller/client/employees/Leave')
const router = express.Router()


//apply leave
router.post('/app/v2/005/leave', requireJWT, Controller.addLeave)


//delete
router.delete('/app/v2/005/drop/leave/:id', requireJWT, Controller.deleteLeave)

//delete
router.put('/app/v2/005/update/leave/:id', requireJWT, Controller.updateLeave)





module.exports = router

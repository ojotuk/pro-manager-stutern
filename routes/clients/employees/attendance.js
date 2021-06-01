const express = require("express");
const moment = require("moment");
const momentTimezone = require("moment-timezone");
const { requireJWT } = require("../../../middleware/auth");
const Controller = require('../../../controller/client/employees/Attendance')
const router = express.Router();

//checkin
router.post('/app/v2/005/attendance/check-in', requireJWT, Controller.checkIn)


//check out
router.post('/app/v2/005/drop/attendannce/:id', requireJWT, Controller.checkOut)



module.exports = router;

const express = require("express");
const moment = require("moment");
const momentTimezone = require("moment-timezone");
const { requireJWT } = require("../../../middleware/auth");
const Controller = require('./../../../controller/client/employees/Task')
const router = express.Router();

//assign new task
router.put("/app/v2/005/task-progress/update/:id", requireJWT, Controller.updateTaskProgress);

module.exports = router;

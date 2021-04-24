const express = require("express");
const moment = require("moment");
const momentTimezone = require("moment-timezone");
const { requireJWT } = require("../../../middleware/auth");
const Controller = require('./../../../controller/client/admin/Task')
const router = express.Router();

//assign new task
router.post("/app/v2/004/new-task", requireJWT, Controller.assignTask);

module.exports = router;

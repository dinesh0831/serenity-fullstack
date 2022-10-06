var express = require('express');
var router = express.Router();
var user=require("../module/vactiontime")

/* GET users listing. */
router.post('/update', user.vacationTime);
router.get("/vacation",user.getVacation)
router.post("/timeSheet",user.timeSheet)
router.get("/vacation/:id",user.particular)

module.exports = router;

const router = require("express").Router();
const { getTime, getTimeCheck } = require("../controllers/time.js");

router.get("/", getTime);
router.get("/check", getTimeCheck);

module.exports = router;

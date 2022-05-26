const router = require("express").Router();
const { getTime } = require("../controllers/time.js");

router.get("/", getTime);

module.exports = router;

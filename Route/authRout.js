const express = require('express')
const {signup,signin} = require("../Controller/auth")
// const  = require("../Controller/auth")

const router = express.Router();

router.post("/signup",signup)
router.post("/signin",signin)

module.exports = router
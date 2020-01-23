
const express = require("express")
const postControler = require("../Controller/firstPostController")
// const {getfirstpost} = require("../Controller/firstPostController")
//const signup = require("../Controller/auth")

const router = express.Router()
router.get("/",postControler.getfirstpost);

router.post("/post",postControler.createPost)


//router.get("/",getfirstpost);

module.exports = router

const router = require("express").Router()
const userControl = require("../controllers/user.controller")
const { authMiddleware } = require("../utils/middleware")

router.route("/").post(userControl.createUser)
router.route("/").get(userControl.loginUsers)

module.exports = router
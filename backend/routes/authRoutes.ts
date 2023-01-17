const express = require("express")
const router = express.Router()

const { login, register, showCurrentUser } = require("../controllers/authController")
const authenticationMiddleware = require("../middlewares/authentication")

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/showMe").get(authenticationMiddleware, showCurrentUser)

module.exports = router
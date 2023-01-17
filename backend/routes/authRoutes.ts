const express = require("express")
const router = express.Router()

const { login, register, showCurrentUser, logout } = require("../controllers/authController")
const authenticationMiddleware = require("../middlewares/authentication")

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/showMe").get(authenticationMiddleware, showCurrentUser)

module.exports = router
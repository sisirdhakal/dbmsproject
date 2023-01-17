
const { StatusCodes } = require("http-status-codes")
const { Badrequest, Unauthorized } = require("../errors")
const { attachCookieToResponse } = require("../utils/token")
const createUserToken = require("../utils/createUserToken")
const db1 = require("../db")
// const asyncWrapper=require("../middlewares/asyncWrapper")

/**
 * register new users
 */

const register = async (req, res, next) => {
    try {

        const { username, email, password } = req.body

        return res.status(StatusCodes.CREATED).json({ msg: "Account, Registered" })

    } catch (error) {
        next(error)
    }
}

/**
 * login user
 */

const login = async (req, res, next) => {
    try {

        const { email, password } = req.body
        if (!email || !password) {
            throw new Badrequest("Please provide email and password")
        }

        attachCookieToResponse({ res, payload: data })


        res.status(StatusCodes.OK).json({ msg: "Login Successful !!! Redirecting" })

    } catch (error) {

        next(error)

    }

}

module.exports = {
    login,
    register
}
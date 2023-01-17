
const { StatusCodes } = require("http-status-codes")
const { Badrequest, Unauthorized } = require("../errors")
const { attachCookieToResponse } = require("../utils/token")
const createUserToken = require("../utils/createUserToken")
const db1 = require("../db")
const { randomUUID } = require("crypto")
const hashPassword = require("../utils/hashPassword")

/**
 * register new users
 */

const register = async (req, res, next) => {
    try {

        let { username, email, password } = req.body

        const primaryKey = randomUUID()

        var query = "CREATE TABLE NOT EXISTS Users (id VARCHAR(20) PRIMARY KEY,name VARCHAR(30) NOT NULL,email VARCHAR(255) UNIQUE NOT NULL,password VARCHAR(30) NOT NULL)";

        db1.execute(
            `SELECT * FROM Users WHERE email=?`, [email],
            (err, result) => {
                if (result.length) {
                    throw new Badrequest("Cannot Register !! Email already exists")
                }
                else {
                    hashPassword(password).then(password => {

                        

                    })

                }
            }
        )



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
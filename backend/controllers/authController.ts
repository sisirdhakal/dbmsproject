
const { StatusCodes } = require("http-status-codes")
const { Badrequest, Unauthorized } = require("../errors")
const { attachCookieToResponse } = require("../utils/token")
const createUserToken = require("../utils/createUserToken")
const db1 = require("../db")
const { randomUUID } = require("crypto")
const hashPassword = require("../utils/hashPassword")
const customError = require("../middlewares/customerror")

/**
 * register new users
 */

const register = async (req, res, next) => {
    try {

        let { username, email, password } = req.body

        if (!email) {
            throw new Badrequest("Please provide email")
        }
        if (!username) {
            throw new Badrequest("Please provide username")
        }
        if (!password) {
            throw new Badrequest("Please provide password")
        }

        db1.execute(
            `SELECT * FROM users WHERE email=?`, [email],
            (err, result) => {
                if (result.length) {
                    throw new Badrequest("Cannot Register !! Email already exists")
                }
                else {
                    hashPassword(password).then(hashedPassword => {

                        const primaryKey = randomUUID()

                        db1.execute(`INSERT INTO users (id,name,email,password) VALUES(?,?,?,?)`, [
                            primaryKey, username, email, hashedPassword
                        ], (err, success) => {
                            if (err) {
                                customError(err, req, res)
                            }
                            else {
                                return res.status(StatusCodes.CREATED).json({ msg: "Account, Registered" })
                            }
                        })

                    }).catch(err => {
                        console.log(err)
                        customError(err, req, res)
                    })

                }
            }
        )

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
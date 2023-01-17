
const { StatusCodes } = require("http-status-codes")
const { Badrequest, Unauthorized } = require("../errors")
const { attachCookieToResponse } = require("../utils/token")
const createUserToken = require("../utils/createUserToken")
const db1 = require("../db")
const { randomUUID } = require("crypto")
const { hashPassword, comparePassword } = require("../utils/hashPassword")
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

        // await db1.execute(
        // `SELECT * FROM users WHERE email=?`, [email],
        // (err, result) => {
        //     if (result.length) {
        //         return res.status(StatusCodes.CONFLICT).json({ msg: "Cannot Register !! Email already exists" })
        //     }
        //     else {
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

        //     }
        // }
        // )

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
        // if (!email || !password) {
        //     throw new Badrequest("Please provide email and password")
        // }

        db1.execute(`SELECT * FROM Users WHERE email=?`, [email], (err, result) => {
            if (result.length) {

                comparePassword(password, result[0].password).then(value => {
                    if (value) {
                        const user = {
                            id: result[0]?.id,
                            username: result[0]?.name,
                            email: result[0]?.email
                        }
                        const payload = createUserToken(user)
                        attachCookieToResponse({ res, payload })
                        res.status(StatusCodes.OK).json({ msg: "Login Successful !!! Redirecting", payload })
                    }
                    else {
                        res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Wrong password !! Please try again" })
                    }
                })

            }
            else {
                res.status(StatusCodes.NOT_FOUND).json({ msg: "Wrong email address !! Please try again" })
            }
        })

        // attachCookieToResponse({ res, payload: data })

    } catch (error) {

        next(error)

    }

}

const showCurrentUser = async (req, res, next) => {

    const { user: { userId } } = req

    db1.execute(`SELECT * FROM Users WHERE id=?`, [userId], (err, result) => {
        if (result.length) {
            res.status(StatusCodes.OK).json({ data: req.user })
        }
        else {
            res.status(StatusCodes.NOT_FOUND).json({ data: false })
        }
    })
}

const logout = async (req, res, next) => {
    res.cookie("token", "loggedout", {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.status(StatusCodes.OK).json({ msg: "LogOut Successful !!! Redirecting" })
}

module.exports = {
    login,
    register,
    showCurrentUser,
    logout
}
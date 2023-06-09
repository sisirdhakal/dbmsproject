

const { StatusCodes } = require("http-status-codes")


const customError = async (err, req, res, next) => {

    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || err.sqlMessage || "Something went wrong ,Please try again"
    }

    if (err.errno === 1062) {
        customError.statusCode = StatusCodes.CONFLICT
        customError.message = "Cannot Register !! Email already exists"
    }

    if (err.name === "TokenExpiredError") {
        res.cookie("token", "loggedout", {
            httpOnly: true,
            expires: new Date(Date.now())
        })
        customError.statusCode = StatusCodes.FORBIDDEN
        customError.message = "Session expired please sign in again !!"
    }

    // return res.status(customError.statusCode).json(err)
    return res.status(customError.statusCode).json({ msg: customError.message, err })

}

module.exports = customError
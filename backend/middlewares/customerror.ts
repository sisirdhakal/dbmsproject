

const { StatusCodes } = require("http-status-codes")


const customError = async (err, req, res, next) => {

    let customError = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || err.sqlMessage || "Something went wrong ,Please try again"
    }
    return res.status(customError.statusCode).json({ msg: customError.message })

}

module.exports = customError
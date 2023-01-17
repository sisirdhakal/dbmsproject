const { StatusCodes } = require("http-status-codes")
const CustomError =require("./customerror")


class Badrequest extends CustomError{
    constructor(message)
    {
        super(message),
        this.statusCode=StatusCodes.BAD_REQUEST
    }
}

module.exports=Badrequest
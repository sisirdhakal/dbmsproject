const { StatusCodes } = require("http-status-codes")
const CustomError =require("./customerror")


class Unauthorized extends CustomError{
    
    constructor(message)
    {
        super(message),
        this.statusCode=StatusCodes.UNAUTHORIZED
    }
}

module.exports=Unauthorized
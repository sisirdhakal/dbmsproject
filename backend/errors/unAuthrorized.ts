const { StatusCodes } = require("http-status-codes")
const CustomError =require("./customerror")


class Unauthorized extends CustomError{
    
    constructor(sqlMessage)
    {
        super(sqlMessage),
        this.statusCode=StatusCodes.UNAUTHORIZED
    }
}

module.exports=Unauthorized
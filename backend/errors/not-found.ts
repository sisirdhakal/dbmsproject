const { StatusCodes } = require("http-status-codes")
const CustomError =require("./customerror")


class Notfound extends CustomError{
    
    constructor(message)
    {
        super(message),
        this.statusCode=StatusCodes.NOT_FOUND
    }
}

module.exports=Notfound
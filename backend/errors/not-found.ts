const { StatusCodes } = require("http-status-codes")
const CustomError =require("./customerror")


class Notfound extends CustomError{
    
    constructor(sqlMessage)
    {
        super(sqlMessage),
        this.statusCode=StatusCodes.NOT_FOUND
    }
}

module.exports=Notfound
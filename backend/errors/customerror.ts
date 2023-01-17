class CustomError extends Error{
    constructor(sqlMessage)
    {
        super(sqlMessage)
    }
}

module.exports=CustomError






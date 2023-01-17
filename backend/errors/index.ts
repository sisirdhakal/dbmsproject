const Unauthorized=require("../errors/unAuthrorized")
const Badrequest=require("../errors/badRequest")
const CustomError=require("../errors/customerror")
const Notfound=require("../errors/not-found")


module.exports={
    Notfound,
    CustomError,
    Badrequest,
    Unauthorized
}
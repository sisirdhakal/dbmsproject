const { Unauthorized } = require("../errors")
const { verifyToken } = require("../utils/token")


const authenticationMiddleware = async (req, res, next) => {
    try {

        let token

        const authHeader = req.headers.authorization
        
        if (req.cookies.token) {
            console.log("h")
            token = req.cookies.token
        }
        else if (req.signedCookies.token) {
            console.log("he")
            token = req.signedCookies.token
        }
        else if (authHeader && authHeader.startsWith("Bearer ")) {
            console.log(authHeader)
            token = authHeader.split(" ")[0]
        }

        
        const payload = verifyToken(token)
        
        
        
        if (!payload) {
            throw new Unauthorized("Please provide valid token")
        }

        req.user = { name: payload.name, userId: payload.userId }

        next()

    } catch (error) {

        next(error)

    }



}

module.exports = authenticationMiddleware
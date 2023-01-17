const { Unauthorized } = require("../errors")
const { verifyToken } = require("../utils/token")


const authenticationMiddleware = async (req, res, next) => {
    try {

        let token

        const authHeader = req.headers.authorization

        if (req.cookies) {
            token = req.cookies.token
        }
        else if (req.signedCookies) {
            token = req.signedCookies.token
        }
        else if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[0]
        }
        console.log(token)

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
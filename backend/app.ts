require("dotenv").config()
require("express-async-errors")


const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const morgan = require("morgan")


/**
 * import database and security
 */
const helmet = require("helmet")
const xss = require("xss-clean")
const cors = require("cors")
const mongoSanitize=require("express-mongo-sanitize")

// port
const port = process.env.PORT || 3000

/**
 * import middlewares
 */
// const AuthRouter = require("./routes/authRoutes")
// const JobsRouter = require("./routes/jobsRoutes")
// const UserRouter = require("./routes/userRoutes")
// const NotFound = require("./middlewares/notFound")
// const CustomErrorHandler = require("./middlewares/customError")
// const { authenticationMiddleware } = require("./middlewares/authentication")



/**
 * security
 */
app.use(helmet())
app.use(xss())
app.use(cors())
app.use(mongoSanitize())


/**
 * middlewares
 */
app.use(morgan("tiny"))
app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.json())
// app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }))

/**
 * routes middlwares
 */
// app.use("/api/v1/auth", AuthRouter)
// app.use("/api/v1/jobs", authenticationMiddleware, JobsRouter)
// app.use("/api/v1/users", authenticationMiddleware, UserRouter)


/**
 * notfound and custom error handler
 */
// app.use(NotFound)
// app.use(CustomErrorHandler)






/**
 * application 
 */

const start = async () => {

    try {

        // await connectDB(process.env.MONGO_URL).then(() => {
        //     console.log("Connected to database successfully")
        // })

        app.listen(port, () => {
            console.log(`app is running on port ${port}`)
        })

    } catch (error) {
        console.log(error)
    }

}

start()



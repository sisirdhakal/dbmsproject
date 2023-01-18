require("dotenv").config()
require("express-async-errors")


const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const { randomUUID } = require("crypto")


/**
 * import database and security
 */
const helmet = require("helmet")
const xss = require("xss-clean")
const cors = require("cors")
const db1 = require("./db")

// port
const port = process.env.PORT || 3000

/**
 * import middlewares
 */
const AuthRouter = require("./routes/authRoutes")
const TasksRouter = require("./routes/tasksRoutes")
// const UserRouter = require("./routes/userRoutes")
const NotFound = require("./middlewares/not-found")
const CustomErrorHandler = require("./middlewares/customerror")
const authenticationMiddleware = require("./middlewares/authentication")



/**
 * security
 */
app.use(helmet())
app.use(xss())
app.use(cors(
    {
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
        credentials: true, // this allows to send back (to client) cookies
        methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
        origin: 'http://localhost:3001',
        preflightContinue: false,
    }
))


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
app.use("/api/v1/auth", AuthRouter)
app.use("/api/v1/tasks", authenticationMiddleware, TasksRouter)
// app.use("/api/v1/users", authenticationMiddleware, UserRouter)


/**
 * notfound and custom error handler
 */
app.use(NotFound)
app.use(CustomErrorHandler)






/**
 * application 
 */

const start = async () => {

    try {

        db1.connect((err) => {
            if (err) throw err;
        });
        app.listen(port, () => {
            console.log(`app is running on port ${port}`)
        })

    } catch (error) {
        console.log(error)
    }

}

start()



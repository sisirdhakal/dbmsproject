const { StatusCodes } = require("http-status-codes")
const db1 = require("../db")
const { randomUUID } = require("crypto")
const customError = require("../middlewares/customerror")


const getAllTasks = async (req, res, next) => {
    try {

        const { userId } = req.user

        db1.execute(`SELECT * FROM Tasks WHERE user=?`,
            [userId]
            , (err, success) => {
                if (err) {
                    customError(err, req, res)
                }
                else {
                    return res.status(StatusCodes.OK).json({ count: success.length, tasks: success })
                }
            })

    } catch (error) {
        next(error)
    }

}

const createTask = async (req, res, next) => {

    try {

        const { user: { userId }, body: { name, taskInfo, date, grouptag } } = req

        console.log(req.body)

        const primaryKey = randomUUID()

        // db1.execute(`INSERT INTO Tasks (id,name,taskInfo,date,grouptag,user) VALUES(?,?,?,?,?,?)`, [
        //     primaryKey,
        //     name,
        //     taskInfo,
        //     date,
        //     grouptag,
        //     userId
        // ], (err, result) => {
        // if (err) {
        //     customError(err, req, res)
        // }
        // else {
        //     return res.status(StatusCodes.CREATED).json({ msg: "Task created successfully" })
        // }
        // })

        res.status(StatusCodes.CREATED).json({ task: userId })

    } catch (error) {
        next(error)
    }

}

const getSingleTask = async (req, res, next) => {

    try {


    } catch (error) {
        next(error)
    }
}

const updateTask = async (req, res, next) => {

    try {

    } catch (error) {
        next(error)
    }

}

const updateStatus = async (req, res, next) => {

    try {


    } catch (error) {
        next(error)
    }

}

const deleteTask = async (req, res, next) => {

    try {


    } catch (error) {

    }
}



module.exports = {
    getAllTasks,
    getSingleTask,
    createTask,
    updateTask,
    deleteTask,
    updateStatus
}
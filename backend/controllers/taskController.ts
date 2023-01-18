const { StatusCodes } = require("http-status-codes")
const db1 = require("../db")


const getAllTasks = async (req, res, next) => {
    try {

        const { userId } = req.user

        return res.status(StatusCodes.OK).json({ count: "task.length" })

    } catch (error) {
        next(error)
    }

}

const createTask = async (req, res, next) => {

    try {

        const { user: { userId }, body: { name, taskInfo, date, group } } = req



        res.status(StatusCodes.CREATED).json({ task: "task" })

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
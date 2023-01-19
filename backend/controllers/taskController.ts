const { StatusCodes } = require("http-status-codes")
const db1 = require("../db")
const { randomUUID } = require("crypto")
const customError = require("../middlewares/customerror")


const getAllTasks = async (req, res, next) => {
    try {

        const { userId } = req.user

        db1.execute(`SELECT * FROM Tasks WHERE user=?`, [
            userId]
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

        const primaryKey = randomUUID()

        db1.execute(`INSERT INTO Tasks (id,name,taskInfo,date,grouptag,user) VALUES(?,?,?,?,?,?)`, [
            primaryKey,
            name,
            taskInfo,
            date,
            grouptag,
            userId
        ], (err, result) => {
            if (err) {
                customError(err, req, res)
            }
            else {
                return res.status(StatusCodes.CREATED).json({ msg: "Task created successfully" })
            }
        })


    } catch (error) {
        next(error)
    }

}

const getSingleTask = async (req, res, next) => {

    try {

        const { user: { userId }, params: { id: taskId }, body: { status } } = req

        db1.execute(
            `SELECT * FROM Tasks WHERE id=? AND user=?`, [
            taskId,
            userId],
            (err, result) => {
                if (result.length) {

                    const task = result[0]

                    res.status(StatusCodes.OK).json({ msg: `Task Fetched`, task })
                }
                else {
                    res.status(StatusCodes.NOT_FOUND).json({ msg: `Task of id ${taskId} cannot be found` })
                }
            }
        )

    } catch (error) {
        next(error)
    }
}

const updateTask = async (req, res, next) => {

    try {

        console.log("hello")
        const { user: { userId }, params: { id: taskId }, body: { status } } = req

        console.log(userId, taskId, status)


        // if (!task) {
        //     throw new Notfound(`Task of id ${taskId} cannot be found`)
        // }

        res.status(StatusCodes.OK).json({ task: "task" })

    } catch (error) {
        next(error)
    }

}

const updateStatus = async (req, res, next) => {

    try {

        const { user: { userId }, params: { id: taskId }, body: { status } } = req

        db1.execute(
            `SELECT * FROM Tasks WHERE id=? AND user=?`, [
            taskId,
            userId],
            (err, result) => {
                if (result) {
                    db1.execute(
                        `UPDATE Tasks SET status=? WHERE id=?`, [
                        status,
                        taskId],
                        (err, result) => {
                            if (err) { res.status(StatusCodes.BAD_REQUEST).json({ msg: `Error while updating status` }) }
                            else {
                                res.status(StatusCodes.OK).json({ msg: "Task's Status Updated !!" })
                            }
                        }
                    )
                }
                else {
                    res.status(StatusCodes.NOT_FOUND).json({ msg: `Task of id ${taskId} cannot be found` })
                }
            }
        )

    } catch (error) {
        next(error)
    }

}

const deleteTask = async (req, res, next) => {

    try {

        const { user: { userId }, params: { id: taskId } } = req

        if (!taskId) {
            throw new Badrequest("Please provide the task id ")
        }

        db1.execute(
            `SELECT * FROM Tasks WHERE id=? AND user=?`, [
            taskId,
            userId],
            (err, result) => {
                if (result) {
                    db1.execute(
                        `DELETE FROM Tasks WHERE id=?`, [
                        taskId],
                        (err, result) => {
                            if (err) { res.status(StatusCodes.BAD_REQUEST).json({ msg: `Error while deleting task` }) }
                            else {
                                res.status(StatusCodes.OK).json({ msg: "Task's Deleted Successfully !!" })
                            }
                        }
                    )
                }
                else {
                    res.status(StatusCodes.NOT_FOUND).json({ msg: `Task of id ${taskId} cannot be found` })
                }
            }
        )

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
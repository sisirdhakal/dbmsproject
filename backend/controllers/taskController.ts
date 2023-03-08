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

                    let sortedTask = []
                    sortedTask = success.sort(function (a, b) {
                        return new Date(b.date) - new Date(a.date);
                    });
                    sortedTask = sortedTask.reverse()

                    return res.status(StatusCodes.OK).json({ count: success.length, tasks: sortedTask })
                }
            })

    } catch (error) {
        next(error)
    }

}

const createTask = async (req, res, next) => {

    try {

        const { user: { userId }, body: { name, taskInfo, date, grouptag: test } } = req

        const primaryKey = randomUUID()

        let grouptag = test || "random"

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
        let updates = {}
        const { user: { userId }, params: { id: taskId }, body: { name, taskInfo, date, grouptag, newgrouptag } } = req

        if (name) {
            updates.name = name
            query = ""
        }
        if (taskInfo) {
            updates.taskInfo = taskInfo
        }
        if (date) {
            updates.date = date
        }
        if (grouptag) {
            updates.grouptag = grouptag
        }
        if (newgrouptag) {
            updates.grouptag = newgrouptag
        }

        // partial query build:
        const part1 = "UPDATE Tasks SET ";
        let part2 = "";
        const part3 = " WHERE id = ?";

        // placeholder for parameters:
        let params = [];

        // query builder:

        for (const property in updates) {
            part2 += property + " = ?, ";
            params.push(updates[property]);
        }
        params.push(taskId);
        const finalQuery = `${part1 + part2.substring(0, part2.length - 2) + part3}`
        // console.log(finalQuery, params)



        db1.execute(
            `SELECT * FROM Tasks WHERE id=? AND user=?`, [
            taskId,
            userId],
            (err, result) => {
                if (result) {
                    db1.execute(
                        `${finalQuery}`, params,
                        (err, result) => {
                            if (err) { res.status(StatusCodes.BAD_REQUEST).json({ msg: `Error while updating task`, err }) }
                            else {
                                res.status(StatusCodes.OK).json({ msg: "Task's Updated Successfully!!" })
                            }
                        }
                    )
                }
                else {
                    res.status(StatusCodes.NOT_FOUND).json({ msg: `Task of id ${taskId} cannot be found` })
                }
            })

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
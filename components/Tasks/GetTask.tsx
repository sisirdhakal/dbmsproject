import React, { useContext, useEffect, useState } from 'react'
import Task from './Task'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import EditTaskContext from '../../contexts/EditTaskContext'

export default function GetTask() {

    const { editTask: { value: taskValue, edited }, setEditTask } = useContext(EditTaskContext)

    const [tasks, setTasks] = useState([])
    const jwtToken = localStorage.getItem("token")
    const history = useNavigate()

    const [displayMsg, setDisplayMsg] = useState(false)

    useEffect(() => {
        const getTask = async () => {
            try {
                const { data: { task, count } } = await axios.get("/api/v1/tasks")
                if (count > 0) {
                    setTasks(task)
                }
                else {
                    setTasks([])
                }
            } catch (error) {
                console.log(error)
            }
        }
        getTask()
        if (!jwtToken) {
            history("/")
        }
        // eslint-disable-next-line
    }, [displayMsg, tasks, edited])

    return (
        <>
            <div className=' p-3'>
                <div className='bg-slate-100  rounded-md'>
                    <div className=' p-3 grid grid-cols-2 gap-5'>
                        {
                            tasks.map(task => {
                                return (
                                    <Task key={task._id} value={task} />
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

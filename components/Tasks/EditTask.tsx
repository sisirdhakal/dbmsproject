import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { BiCircle } from 'react-icons/bi'
import axios from 'axios'
import EditTaskContext from '../../contexts/EditTaskContext'
import moment from 'moment'


export default function EditTask() {

    const { id } = useParams()

    const { editTask: { value, id: taskId }, setEditTask } = useContext(EditTaskContext)

    const initialValue = {
        tName: "",
        tDetail: "",
        tNDate: "",
        tDate: ""
    }
    const [values, setvalues] = useState(initialValue)

    const handleChange = (e) => {
        setvalues({
            ...values,
            [e.target.name]: e.target.value
        })
    }


    const editTask = async () => {
        try {
            const { data: { task } } = await axios.patch(`/api/v1/tasks/${taskId}`, {
                name: values.tName,
                taskInfo: values.tDetail,
                date: values.tNDate
            })

            if (task) {
                setEditTask(false)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchSingleTask = async () => {
            try {
                const { data: { task } } = await axios.get(`/api/v1/tasks/${taskId}`)
                if (task) {
                    let date = moment(value.date)
                    date = date.format('MMMM Do YYYY, h:mm a')

                    setvalues({
                        tName: task.name,
                        tDetail: task.taskInfo,
                        tDate: date,
                        tNDate: ""
                    })
                }
            } catch (error) {
                console.log(error)
            }

        }
        fetchSingleTask()

        // eslint-disable-next-line
    }, [])

    // const [taskName, settaskName] = useState('')
    // const [taskDetail, settaskDetail] = useState('')

    // const [displayMsg, setDisplayMsg] = useState(false)



    return (
        <>

            <div className='p-3'>
                {/* mentioning the current user */}

                {/* add tasks div */}
                <div className='w-full'>
                    <div className=' rounded-md overflow-clip mx-auto'>
                        <div className='bg-slate-100'>
                            <div className='bg-[#181D3D] py-5 rounded-bl-[44px]'>
                                <div className=''>
                                    <p id='taskLogo' className='text-center text-white  text-3xl '>
                                        Edit Task
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='bg-[#181D3D]'>

                            <form action="" className='bg-slate-100 py-5 rounded-tr-[44px] ' onSubmit={e => e.preventDefault()}>
                                {/* Task name */}
                                <div className='w-[60%] mx-auto p-1'>
                                    <p className=' font-serif'>Task Name :</p>
                                    <input name='tName' value={values.tName} className='h-8 w-full rounded-md border focus:ring-0 focus:ring-offset-0 focus:border-gray-700 border-gray-400 text-sm placeholder:mx-6' type="text" onChange={handleChange} />
                                </div>
                                <div className='w-[60%] mx-auto p-1'>
                                    <p className='font-serif'>Task Detail :</p>
                                    <input name='tDetail' value={values.tDetail} type="text" className='h-8 w-full rounded-md border focus:ring-0 focus:ring-offset-0 focus:border-gray-700 border-gray-400 text-sm placeholder:mx-6' onChange={handleChange} />
                                </div>

                                <div className='w-[60%] mx-auto p-1'>
                                    <p className='font-serif'>Previous Date :</p>
                                    <p name='tDate' type={"text"} className='h-8 w-full rounded-md border border-gray-400 text-sm flex items-center '>{values.tDate}</p>
                                </div>
                                <div className='w-[60%] mx-auto p-1'>
                                    <p className='font-serif'>Task New Date :</p>
                                    <input name='tNDate' type={"datetime-local"} className='h-8 w-full rounded-md border focus:ring-0 focus:ring-offset-0 focus:border-gray-700 border-gray-400 text-sm placeholder:mx-6' value={values.tNDate} onChange={handleChange} />
                                </div>

                                <div className='w-full items-center flex justify-center formItems'>
                                    <button className='text-gray-800   pointer-events-auto w-full lg:w-[60%] mx-auto my-5   border h-6 lg:h-10 rounded-md hoverBtn btn1 transition-colors duration-300 ease-in-out hover:text-white after:bg-[#181D3D] bg-red-400' onClick={editTask}>
                                        Edit Task
                                    </button>
                                </div>
                                {/* {displayMsg && <div className=' mt-2 '>
                                    <p className=' text-sm text-green-700 text-center'>Task added successfully</p>
                                </div>} */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

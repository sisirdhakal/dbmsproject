import { getUniqueValues } from '@/utils/helpers'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'



export default function AddTask() {

    const initialValue = {
        name: "",
        taskInfo: "",
        grouptag: "",
        date: ""
    }
    const [values, setvalues] = useState(initialValue)
    const [displayMsg, setDisplayMsg] = useState(false)

    const handleChange = (e) => {
        setvalues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const { tasks } = useSelector(state => state.tasks)

    const addTask = async () => {

        const { data: { task } } = await axios.post("/api/v1/tasks", {

            name: values.name,
            taskInfo: values.taskInfo,
            date: values.date
        })
        if (task) {
            setDisplayMsg(true)
            setTimeout(() => {
                setDisplayMsg(false)
            }, 1500);
            setvalues(initialValue)
        }

    }

    const groupTag = getUniqueValues(tasks, 'grouptag')

    return (
        <>
            <div className='px-3 py-10'>
                {/* mentioning the current user */}

                {/* add tasks div */}
                <div className='w-full '>
                    <div className=' rounded-md overflow-clip mx-auto'>
                        <div className='bg-[#e9e2de]'>
                            <div className='bg-clrgrey3 py-5 rounded-bl-[44px]'>
                                <div className=''>
                                    <p id='taskLogo' className='text-center text-white  text-3xl '>
                                        Add New Task
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='bg-clrgrey3'>

                            <form action="" className='bg-[#e9e2de] grid lg:grid-cols-3 gap-y-5 gap-x-4 rounded-tr-[44px] py-10 px-6' onSubmit={e => e.preventDefault()}>
                                {/* Task name */}
                                <div className='w-full mx-auto'>
                                    <p className=' font-serif'>Task Name :</p>
                                    <input name='name' value={values.name} className=' w-full rounded-md border focus:ring-0 focus:ring-offset-0 focus:border-gray-700 border-gray-400 text-sm placeholder:mx-6' type="text" onChange={handleChange} />
                                </div>
                                <div className='w-full mx-auto'>
                                    <p className='font-serif'>Task Detail :</p>
                                    <input name='taskInfo' value={values.taskInfo} type="text" className=' w-full rounded-md border focus:ring-0 focus:ring-offset-0 focus:border-gray-700 border-gray-400 text-sm placeholder:mx-6' onChange={handleChange} />
                                </div>
                                {groupTag.length > 0 && <div className=''>
                                    <p className='font-serif'>Task Group :</p>
                                    <select
                                        className='w-full rounded-md border focus:ring-0 focus:ring-offset-0 focus:border-gray-700 border-gray-400 text-sm placeholder:mx-6 cursor-pointer' placeholder='' name='idType'
                                        value={values.grouptag}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled defaultValue>Task Tag</option>
                                        {
                                            groupTag.map((value, index) => { return <option value={value} key={index} className='cursor-pointer capitalize'>Citizenship</option> })
                                        }



                                    </select>
                                </div>}
                                <div>
                                    <p className='font-serif'>Create New Group :</p>
                                    <input name='taskInfo' value={values.taskInfo} type="text" className=' w-full rounded-md border focus:ring-0 focus:ring-offset-0 focus:border-gray-700 border-gray-400 text-sm placeholder:mx-6' onChange={handleChange} />
                                </div>

                                <div className='w-full mx-auto'>
                                    <p className='font-serif'>Task Date :</p>
                                    <input name='date' type={"datetime-local"} className=' w-full rounded-md border focus:ring-0 focus:ring-offset-0 focus:border-gray-700 border-gray-400 text-sm placeholder:mx-6' value={values.date} onChange={handleChange} />
                                </div>


                                <div className='w-full items-center flex justify-center'>
                                    <button className='  pointer-events-auto w-full lg:w-full mx-auto   border h-6 lg:h-10 rounded-md text-clrprimary10  transition-all duration-500 bg-clrprimary5 hover:text-clrgrey2 hover:bg-clrprimary7 mt-[22px] ease-in-out' onClick={addTask}>
                                        Add Task
                                    </button>

                                </div>
                                {displayMsg && <div className=' mt-2 '>
                                    <p className=' text-sm text-green-700 text-center'>Task added successfully</p>
                                </div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

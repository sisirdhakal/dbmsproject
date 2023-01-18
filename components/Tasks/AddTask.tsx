import axios from 'axios'
import React, { useState, useEffect } from 'react'



export default function AddTask() {

    const initialValue = {
        tName: "",
        tDetail: "",
        tGroup: "",
        tDate: ""
    }
    const [values, setvalues] = useState(initialValue)
    const [displayMsg, setDisplayMsg] = useState(false)

    const handleChange = (e) => {
        setvalues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const addTask = async () => {

        const { data: { task } } = await axios.post("/api/v1/tasks", {

            name: values.tName,
            taskInfo: values.tDetail,
            date: values.tDate
        })
        if (task) {
            setDisplayMsg(true)
            setTimeout(() => {
                setDisplayMsg(false)
            }, 1500);
            setvalues(initialValue)
        }

    }

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
                                    <input name='tName' value={values.tName} className=' w-full rounded-md border focus:ring-0 focus:ring-offset-0 focus:border-gray-700 border-gray-400 text-sm placeholder:mx-6' type="text" onChange={handleChange} />
                                </div>
                                <div className='w-full mx-auto'>
                                    <p className='font-serif'>Task Detail :</p>
                                    <input name='tDetail' value={values.tDetail} type="text" className=' w-full rounded-md border focus:ring-0 focus:ring-offset-0 focus:border-gray-700 border-gray-400 text-sm placeholder:mx-6' onChange={handleChange} />
                                </div>
                                <div className=''>
                                    <p className='font-serif'>Task Group :</p>
                                    <select
                                        className='w-full rounded-md border focus:ring-0 focus:ring-offset-0 focus:border-gray-700 border-gray-400 text-sm placeholder:mx-6 cursor-pointer' placeholder='' name='idType'
                                        value={values.tGroup}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled defaultValue>Task Tag</option>
                                        <option value='Citizenship' className='cursor-pointer capitalize'>Citizenship</option>
                                        <option value='Passport' className='cursor-pointer'>Passport</option>

                                    </select>
                                </div>
                                <div>
                                    <p className='font-serif'>Create New Group :</p>
                                    <input name='tDetail' value={values.tDetail} type="text" className=' w-full rounded-md border focus:ring-0 focus:ring-offset-0 focus:border-gray-700 border-gray-400 text-sm placeholder:mx-6' onChange={handleChange} />
                                </div>

                                <div className='w-full mx-auto'>
                                    <p className='font-serif'>Task Date :</p>
                                    <input name='tDate' type={"datetime-local"} className=' w-full rounded-md border focus:ring-0 focus:ring-offset-0 focus:border-gray-700 border-gray-400 text-sm placeholder:mx-6' value={values.tDate} onChange={handleChange} />
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

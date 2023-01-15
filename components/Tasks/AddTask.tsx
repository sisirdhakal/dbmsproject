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
    const [jwtToken] = useState(localStorage.getItem("token"))

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
            <div className='p-3'>
                {/* mentioning the current user */}

                {/* add tasks div */}
                <div className='w-full'>
                    <div className=' rounded-md overflow-clip mx-auto'>
                        <div className='bg-slate-100'>
                            <div className='bg-[#181D3D] py-5 rounded-bl-[44px]'>
                                <div className=''>
                                    <p id='taskLogo' className='text-center text-white  text-3xl '>
                                        Add New Task
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
                                    <p className='font-serif'>Task Date :</p>
                                    <input name='tDate' type={"datetime-local"} className='h-8 w-full rounded-md border focus:ring-0 focus:ring-offset-0 focus:border-gray-700 border-gray-400 text-sm placeholder:mx-6' value={values.tDate} onChange={handleChange} />
                                </div>

                                <div className='w-full items-center flex justify-center formItems'>
                                    <button className='text-gray-800   pointer-events-auto w-full lg:w-[60%] mx-auto my-5   border h-6 lg:h-10 rounded-md hoverBtn btn1 transition-colors duration-300 ease-in-out hover:text-white after:bg-[#181D3D] bg-red-400' onClick={addTask}>
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

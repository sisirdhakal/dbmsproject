import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { BiCircle } from 'react-icons/bi'
import axios from 'axios'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '@/states'
import toast from 'react-hot-toast'


export default function EditTaskComp() {

    const dispatch = useDispatch()
    const { setEditSuccess, setMessage } = bindActionCreators(actionCreators, dispatch)

    const { editTask } = useSelector(state => state.tasks)

    const [values, setvalues] = useState(editTask)

    const [changes, setchanges] = useState({})

    const handleChange = (e) => {
        setvalues({
            ...values,
            [e.target.name]: e.target.value
        })
        if (e.target.value === editTask.grouptag) {
            const { grouptag, ...newchange } = changes
            setchanges(newchange)
            return;
        }
        if (e.target.name === "newgrouptag" && !e.target.value) {
            const { newgrouptag, ...newchange } = changes
            setchanges(newchange)
            return;
        }
        setchanges({
            ...changes,
            [e.target.name]: e.target.value
        })
    }


    const { groupTag } = useSelector(state => state.tasks)


    const editTaskV = async () => {
        try {
            const isEmpty = Object.keys(changes).length === 0;
            if (isEmpty) {
                toast.success("Task's is unchanged")
                setEditSuccess()
                setMessage("Task's is unchanged")
                return;
            }
            const { data } = await axios.patch(`http://localhost:3000/api/v1/tasks/${editTask.id}`, changes, { withCredentials: true })

            if (data) {
                setEditSuccess()
                setMessage(data.msg)
                toast.success(data.msg)
            }

        } catch (error) {
            console.log(error)
            if (error?.response?.data?.msg) {
                toast.error(error.response.data.msg)
            }
        }
    }



    return (
        <>
            <div className='px-3 py-10'>
                {/* mentioning the current user */}

                {/* add tasks div */}
                <div className='w-full '>
                    <div className=' rounded-md overflow-clip mx-auto'>
                        <div className='bg-clrprimary10'>
                            <div className='bg-clrgrey3 py-5 rounded-bl-[44px]'>
                                <div className=''>
                                    <p id='taskLogo' className='text-center text-white  text-3xl '>
                                        Edit Task
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='bg-clrgrey3'>

                            <form action="" className='bg-clrprimary10 grid lg:grid-cols-3 gap-y-5 gap-x-4 rounded-tr-[44px] py-10 px-6' onSubmit={e => e.preventDefault()}>
                                {/* Task name */}
                                <div className='w-full mx-auto'>
                                    <p className=' font-serif'>Task Name :</p>
                                    <input name='name' value={values.name} className=' w-full rounded-md border focus:ring-0 focus:ring-offset-0 focus:border-gray-700 border-gray-400 text-sm placeholder:mx-6' type="text" onChange={handleChange} />
                                </div>
                                <div className='w-full mx-auto'>
                                    <p className='font-serif'>Task Detail :</p>
                                    <input name='taskInfo' value={values.taskinfo} type="text" className=' w-full rounded-md border focus:ring-0 focus:ring-offset-0 focus:border-gray-700 border-gray-400 text-sm placeholder:mx-6' onChange={handleChange} />
                                </div>
                                {groupTag.length > 0 && <div className=''>
                                    <p className={`font-serif ${values.newgrouptag ? ('opacity-50') : ('opacity-100')}`}>Task Group :</p>
                                    <select
                                        className='w-full rounded-md border focus:ring-0 focus:ring-offset-0 focus:border-gray-700 border-gray-400 text-sm placeholder:mx-6 cursor-pointer disabled:cursor-not-allowed' placeholder='' name='grouptag'
                                        disabled={values.newgrouptag ? true : false}
                                        value={values.grouptag}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled defaultValue>Task Tag</option>
                                        {/* <option value=""  >-</option> */}
                                        {
                                            groupTag.map((value, index) => { return <option value={value} key={index} className='cursor-pointer capitalize'>{value}</option> })
                                        }



                                    </select>
                                </div>}
                                <div>
                                    <p className={`font-serif ${values.grouptag !== editTask.grouptag ? ("opacity-50") : ("opacity-100")}`}>Create New Group :</p>
                                    <input disabled={values.grouptag !== editTask.grouptag ? (true) : (false)} name='newgrouptag' value={values.newgrouptag ? values.newgrouptag : ""} type="text" className=' w-full rounded-md border focus:ring-0 focus:ring-offset-0 focus:border-gray-700 border-gray-400 text-sm placeholder:mx-6 disabled:cursor-not-allowed disabled:opacity-50' onChange={handleChange} />
                                </div>

                                <div className='w-full mx-auto'>
                                    <p className='font-serif'>Task Date :</p>
                                    <input name='date' type={"datetime-local"} className=' w-full rounded-md border focus:ring-0 focus:ring-offset-0 focus:border-gray-700 border-gray-400 text-sm placeholder:mx-6' value={values.date} onChange={handleChange} />
                                </div>


                                <div className='w-full items-center flex justify-center'>
                                    <button className='  pointer-events-auto w-full lg:w-full mx-auto   border h-6 lg:h-10 rounded-md text-clrgrey1  transition-all duration-500  hover:text-white bg-emerald-200 hover:bg-emerald-500 font-semibold  mt-[22px] ease-in-out' onClick={editTaskV}>
                                        Edit Task
                                    </button>

                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

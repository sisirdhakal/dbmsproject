import React, { useContext, useState } from 'react'
import { BsSquare, BsCheckSquare } from 'react-icons/bs'
import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { actionCreators } from '../../states'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { FaCalendarAlt } from 'react-icons/fa'
import axios from "axios"
import EditTaskContext from '../../contexts/EditTaskContext'

export default function Task({ value }) {

  const dispatch = useDispatch()
  const { setDeleted } = bindActionCreators(actionCreators, dispatch)
  const [tStatus, settStatus] = useState(value.status)

  const { editTask: { edited }, setEditTask } = useContext(EditTaskContext)

  const token = localStorage.getItem("token")
  const deleteTask = async (id) => {

    try {
      await axios.delete(`/api/v1/tasks/${id}`
      ).then(setEditTask({
        deleted: "deleted"
      }))

    } catch (error) {
      console.log(error)
    }

  }

  let date = moment(value.date)
  date = date.format('MMMM Do YYYY, h:mm a')
  const logo = value.name.charAt(0).toUpperCase()

  const setStatus = async (status) => {

    try {

      const { data: { task } } = await axios.patch(`/api/v1/tasks/status/${value._id}`, {
        status: status
      })
      if (task) {
        settStatus(task.status)
        setEditTask({
          edited: "edited"
        })

      }

    } catch (error) {
      console.log(status)
    }
  }

  const editTask = (e) => {
    setEditTask({ data: true, id: e.target.id })
  }

  return (
    <>

      <div className=' lg:h-60 w-[90%] py-3 lg:py-0 mx-auto lg:w-full bg-white rounded-md shadow-md'>
        <div className='border-b flex px-6 py-3 '>
          <span className='  bgLogo  flex items-center justify-center w-16 p-3 rounded-md'>
            <span className=' text-white text-3xl font-medium tLogo'>{logo}</span>
          </span>
          <div className='ml-8 items-center flex flex-1 justify-start'>

            <p className=' font-sans text-2xl capitalize text-gray-800'>{value.name}</p>

          </div>
          <div className=' flex gap-x-3 mr-5 items-center justify-center'>
            <p className='text-xl text-gray-800 '>Done</p>
            {
              tStatus ?
                (
                  <BsCheckSquare onClick={e => setStatus(false)} className='h-6 w-6 text-gray-800 cursor-pointer' />
                ) :
                (<BsSquare onClick={e => setStatus(true)} className='h-6 w-6 text-gray-800 cursor-pointer' />
                )}
          </div>
        </div>

        {/* job details information */}

        <div className=" grid grid-cols-1 gap-y-2  justify-between px-10 py-2">
          <div className='py-3'>
            <p className='text-lg '>
              {value.taskInfo}
            </p>
          </div>
          <div className='flex items-center justify-center w-full'>
            <div className='flex items-center gap-3 flex-1'>
              <FaCalendarAlt className='text-gray-400' />
              <p className='capitalize text-gray-900 font-mono'>{date}</p>
            </div>
            <div>
              {tStatus ? (
                <div className=' p-1 w-40 text-center tracking-wider capitalize rounded-md completed bg-green-200`'>
                  <p className=' text-green-600 '>Completed</p>
                </div>
              ) : (
                <div className=' p-1 w-40 text-center tracking-wider capitalize rounded-md pending'>
                  <p className=' text-yellow-700 '>Pending...</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* buttons */}

        <div className='px-6 gap-4 flex'>

          <button id={value._id} className='bg-emerald-200 hover:bg-emerald-400 hover:text-white text-emerald-800 w-24 py-1 rounded-md transition-all duration-500 ease-in-out' onClick={editTask}>Edit</button>

          <button id={value._id} className='bg-red-200 hover:bg-red-400 hover:text-white text-red-800 w-24 py-1 rounded-md transition-all duration-500 ease-in-out' onClick={e => { deleteTask(value._id) }} >Delete</button>
        </div>

      </div>

    </>
  )
}

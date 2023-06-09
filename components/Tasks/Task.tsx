import React, { useContext, useState } from 'react'
import { BsSquare, BsCheckSquare } from 'react-icons/bs'
import { bindActionCreators } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators } from '../../states'
import moment from 'moment'
import { FaCalendarAlt } from 'react-icons/fa'
import { BiTime } from 'react-icons/bi'
import axios from "axios"
import { toast } from 'react-hot-toast'
import Link from 'next/link'

export default function Task({ value }) {

  const dispatch = useDispatch()
  const { setMessage, setEditTask } = bindActionCreators(actionCreators, dispatch)


  const deleteTask = async (id) => {

    try {
      const { data } = await axios.delete(`http://localhost:3000/api/v1/tasks/${value.id}`, { withCredentials: true })
      if (data) {
        setMessage(data.msg)
        toast.success(data.msg)
      }
    } catch (error) {
      console.log(error)
    }

  }

  let datetime = moment(value.date)
  const date = datetime.format('MMMM Do YYYY')
  const time = datetime.format('h:mm a')
  const logo = value.name.charAt(0).toUpperCase()

  const setStatus = async (status) => {

    try {
      const { data } = await axios.patch(`http://localhost:3000/api/v1/tasks/status/${value.id}`, {
        status: status
      }, { withCredentials: true })
      if (data) {
        setMessage(data.msg)
        toast.success(data.msg)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const editTask = (e) => {
    setEditTask(value)
  }

  return (
    <>

      <div className=' lg:h-60 w-[90%] py-3 lg:py-0 mx-auto lg:w-full bg-white rounded-md shadow-md'>
        <div className='border-b flex pl-6 pr-4 py-3 bg-clrprimary8 rounded-t-md'>
          <span className=' bg-clrprimary2  flex items-center justify-center w-16 p-3 rounded-md'>
            <span className=' text-white text-3xl font-medium tLogo'>{logo}</span>
          </span>
          <div className='ml-8 items-center flex-1'>

            <p className=' font-sans font-semibold text-3xl capitalize text-clrgrey2 tracking-wide'>{value.name}</p>
            <p className=' font-sans font-semibold capitalize text-clrgrey4 tracking-wide'>{value.grouptag}</p>

          </div>
          <div className=' flex gap-x-3 mr-5 items-center justify-center'>
            <p className='text-2xl tracking-wide text-clrgrey2 font-medium '>Done</p>
            {
              value.status ?
                (
                  <BsCheckSquare onClick={e => setStatus(false)} className='h-6 w-6 bg-white text-gray-800 cursor-pointer rounded-[3px]' />
                ) :
                (<BsSquare onClick={e => setStatus(true)} className='h-6 w-6 bg-white rounded-[3px] text-gray-800 cursor-pointer' />
                )}
          </div>
        </div>

        {/* job details information */}

        <div className=" grid grid-cols-1 gap-y-2  justify-between pl-6 pr-8 mb-3">
          <div className='py-3'>
            <p className='text-lg '>
              {value.taskInfo}
            </p>
          </div>
          <div className='grid grid-cols-task'>
            <div className='grid grid-rows-2'>
              <div className='flex items-center gap-3 mb-1'>
                <FaCalendarAlt className='text-gray-400 h-5 w-6' />
                <p className='capitalize text-gray-900 font-mono text-lg'>{date}</p>
              </div>
              <div className='flex items-center gap-3'>
                <BiTime className='text-gray-400 h-6 w-6' />
                <p className='capitalize text-gray-900 font-mono text-lg'>{time}</p>
              </div>
            </div>
            <div>
              {value.status ? (
                <div className=' p-1 w-full text-center tracking-wider capitalize rounded-md completed bg-green-200`'>
                  <p className=' text-green-600 '>Completed</p>
                </div>
              ) : (
                <div className=' p-1 w-full text-center tracking-wider capitalize rounded-md bg-yellow-300'>
                  <p className=' text-yellow-800 font-medium'>Pending...</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* buttons */}

        <div className='px-6 gap-4 flex'>


          <button id={value.id} className='bg-emerald-200 hover:bg-emerald-400 hover:text-white text-emerald-800 w-24 py-1 rounded-md transition-all duration-500 ease-in-out' onClick={editTask}>Edit</button>



          <button id={value.id} className='bg-red-200 hover:bg-red-400 hover:text-white text-red-800 w-24 py-1 rounded-md transition-all duration-500 ease-in-out' onClick={e => { deleteTask(value.id) }} >Delete</button>
        </div>

      </div>

    </>
  )
}

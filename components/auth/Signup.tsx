import React from 'react'
import { useState, useEffect, useRef, useContext } from 'react'
import logo from '../../assets/images/download'
import { useNavigate } from "react-router-dom"
import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { actionCreators } from '../../states'
import Usercontext from '../../contexts/Usercontext'
import axios from 'axios'


export default function Signup() {

  const dispatch = useDispatch()
  const { setUserName, setJwtToken } = bindActionCreators(actionCreators, dispatch)
  const { setState } = useContext(Usercontext)
  const domItem = useRef(null)
  // useEffect(()=>{
  //   setUserName(null);
  //   setUserId(null)

  //   // eslint-disable-next-line
  // },[])


  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const history = useNavigate()
  const [message, setmessage] = useState("")



  const register = async () => {
    try {

      const { data } = await axios.post("/api/v1/auth/register", {
        username,
        email,
        password

      })

      if (data) {
        setUserName(data.username)
        setJwtToken(data.token)
        localStorage.setItem("token", data.token)
        localStorage.setItem("username", data.username)
        domItem.current.classList.add("text-green-500")
        domItem.current.classList.remove("text-red-400")
        setmessage(message)
        setTimeout(() => {
          history("/dashboard")
        }, 2000);
      }

    } catch (error) {

      if (error.response?.data.msg) {
        domItem.current.classList.add("text-red-400")
        domItem.current.classList.remove("text-green-500")
        setmessage(error.response.data.msg)
      }

    }



  }

  // useEffect(() => {
  //   console.clear()
  //   // eslint-disable-next-line
  // }, [])

  return (
    <>
      <div className='login flex items-center justify-center h-screen'>

        <div className='relative h-[540px] w-[420px] rounded-lg overflow-clip transition-all duration-500 ease-in-out hover:shadow-2xl bg-white'>
          <div className='title-container flex items-center justify-center bg-[#181D3D]  p-3 rounded-bl-3xl'>
            <p className='logoS text-6xl text-gray-200 px-2'>T</p>
            <p className='head text-5xl text-center text-white'> ask Manager</p>
          </div>

          <div className=' bg-[#181D3D]'>
            <div className='p-3 text-4xl rounded-tr-3xl font-sans bg-white text-[#102A43] text-center items-center flex justify-center'>
              <p>Register</p>
            </div>
          </div>

          <div className='text-center flex px-2 justify-center h-8'>
            <p ref={domItem} className=' w-80 rounded-md'>
              {message}
            </p>
          </div>

          <form action="" onSubmit={e => e.preventDefault()} className='px-6 w-[88%] mx-auto'>

            <div className=' mb-2 mx-auto'>
              <p className=' font-sans my-2 text-lg text-gray-900'>Username</p>
              <input className='rounded-md focus:ring-gray-800 border-gray-500 w-80 focus:border-gray-800' type="text" name="userName" value={username} onChange={e => { setUsername(e.target.value) }} />
            </div>
            <div className='  mb-2 mx-auto'>
              <p className=' font-sans my-2 text-lg text-gray-900'>Email</p>
              <input className='rounded-md focus:ring-gray-800 border-gray-500 w-80 focus:border-gray-800' type="email" name="userEmail" value={email} onChange={e => { setEmail(e.target.value) }} />
            </div>


            <div className='mb-4'>
              <p className=' font-sans my-2 text-lg text-gray-900'>Password</p>
              <input className='rounded-md focus:ring-gray-800 border-gray-500 w-80 focus:border-gray-800' type="password" name="userPassword" onChange={e => { setPassword(e.target.value) }} value={password} />
            </div>
            <button className='text-gray-800   pointer-events-auto w-80 border h-9 rounded-md hoverBtn btn1 transition-colors duration-300 ease-in-out hover:text-white after:bg-[#181D3D] bg-red-400' onClick={register}>
              Register
            </button>

            <div className=' absolute bottom-2 '>
              <p className=' font-sans my-2 w-80 text-center text-lg text-gray-900'>Already have an account?
                <button className=' text-emerald-800 ml-2' onClick={() => { setState("login") }} > Login</button>
              </p>

            </div>

          </form>
        </div>
      </div>
    </>
  )
}

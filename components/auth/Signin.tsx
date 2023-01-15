import React, { useState, useEffect, useContext, useRef } from 'react'
import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { actionCreators } from '../../states'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Usercontext from '../../contexts/Usercontext'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Signin() {


    const router = useRouter()
    const { setState } = useContext(Usercontext)
    const domItem = useRef(null)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const { setUserName, setJwtToken } = bindActionCreators(actionCreators, dispatch)
    const [message, setmessage] = useState("")

    const token = useSelector(state => state.token)

    const login = async () => {
        try {
            // const { data } = await axios.post("/api/v1/auth/login", {
            //     email,
            //     password
            // })
            // if (data) {
            //     localStorage.setItem("token", data.token)
            //     localStorage.setItem("username", data.username)
            //     setUserName(data.username)
            //     setJwtToken(data.token)
            //     domItem.current.classList.add("text-green-500")
            //     domItem.current.classList.remove("text-red-400")
            //     setmessage(data.msg)
            //     setTimeout(() => {
            //         history("/dashboard")
            //     }, 2000);

            // }
        } catch (error) {
            // console.log(error)
            // if (error.response?.data.msg) {
            //     domItem.current.classList.add("text-red-400")
            //     domItem.current.classList.remove("text-green-500")
            //     setmessage(error.response.data.msg)
            // }
        }

    }

    useEffect(() => {
        // console.clear()

        // const token = localStorage.getItem("token")
        // const userName = localStorage.getItem("userName")

        // if (token) {
        //     history("/dashboard")
        //     console.clear()
        // }

        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className='login flex px-2 items-center justify-center h-screen'>
                <div className='relative h-[480px] lg:w-[420px] rounded-lg overflow-clip transition-all duration-500 ease-in-out hover:shadow-2xl bg-white'>
                    {/* <div className='h-1 rounded-t-lg w-full'></div> */}
                    <div className='title-container flex items-center justify-center bg-[#181D3D] rounded-bl-3xl  p-3'>

                        <p className='logoS text-6xl text-gray-200 px-2'>T</p>
                        <p className='head text-5xl text-center text-white'>ask Manager</p>
                    </div>
                    <div className='bg-[#181D3D]'>

                        <div className='p-4 text-4xl font-sans bg-white text-[#102A43] text-center items-center flex justify-center rounded-tr-3xl'>
                            <p>Login</p>
                        </div>
                    </div>

                    <div className='text-center flex py-1 px-2 justify-center h-8'>
                        <p ref={domItem} className=' w-80 rounded-md'>
                            {message}
                        </p>
                    </div>

                    <form onSubmit={e => e.preventDefault()} action="" className='px-6 w-[88%] mx-auto py-2'>

                        <div className=' mt-2 mb-4 mx-auto'>
                            <p className=' font-sans my-2 text-lg text-gray-900'>Email</p>
                            <input onChange={e => { setEmail(e.target.value) }} className='rounded-md focus:ring-gray-800 border-gray-500 w-80 focus:border-gray-800' type="email" name="userEmail" />
                        </div>


                        <div className='mb-4'>
                            <p className=' font-sans my-2 text-lg text-gray-900'>Password</p>
                            <input onChange={(e) => { setPassword(e.target.value) }} className='rounded-md focus:ring-gray-800 border-gray-500 w-80 focus:border-gray-800' type="password" name="userPassword" />
                        </div>

                        {/* <button onClick={login} className='w-80 p-1 h-9 rounded-md text-white bg-emerald-400 hover:bg-emerald-600 transition-all duration-500 ease-in-out text-xl font-serif'>Login</button> */}
                        <button className='text-gray-800   pointer-events-auto w-80 mx-auto    border h-9 rounded-md hoverBtn btn1 transition-colors duration-300 ease-in-out hover:text-white after:bg-[#181D3D] bg-red-400' onClick={login}>
                            Login
                        </button>

                        <div className=' absolute bottom-1 '>
                            <p className=' font-sans my-2 w-80 text-center text-lg text-gray-900'>Don't have an account?

                                <button className=' text-emerald-800 ml-2' onClick={() => { router.push("/signup") }} >Register</button>
                            </p>

                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

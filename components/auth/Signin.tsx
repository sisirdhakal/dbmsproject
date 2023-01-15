import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { BiShow, BiHide } from 'react-icons/bi';
import { BsFacebook, BsGoogle } from 'react-icons/bs'
import { FiMail } from 'react-icons/fi'
import { MdVpnKey } from 'react-icons/md'
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router'
import { actionCreators } from '../../states'

export default function Signin() {


    const router = useRouter()
    const initialValue = {
        email: "",
        password: ""
    }

    const dispatch = useDispatch()
    const { authToggle } = bindActionCreators(actionCreators, dispatch)


    const [values, setvalues] = useState(initialValue)
    const [showpass, setshowpass] = useState(false);

    const handleChange = (e) => {
        setvalues({ ...values, [e.target.name]: e.target.value })
    }
    const domItem = useRef(null)

    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")

    // const dispatch = useDispatch()
    // const { setUserName, setJwtToken } = bindActionCreators(actionCreators, dispatch)
    const [message, setmessage] = useState("")

    // const token = useSelector(state => state.token)

    const loginUser = async () => {
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
            {/* <div className='login flex px-2 items-center justify-center h-screen'>
                <div className='relative h-[480px] lg:w-[420px] rounded-lg overflow-clip transition-all duration-500 ease-in-out hover:shadow-2xl bg-white'>
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
            </div> */}
            <div className='flex px-2 items-center justify-center h-screen py-5'>

                <div className='w-full hover:shadow-xl shadow-black transition-all ease-linear duration-300 lg:w-[480px]  pb-2 rounded-md bg-[#e9e2de] mx-auto'>

                    <div className='title-container flex items-center justify-center bg-[#181D3D] rounded-bl-[32px] rounded-t-md  p-3'>

                        <p className='logoS text-6xl text-gray-200 px-2'>T</p>
                        <p className='head text-5xl text-center text-white'>ask Manager</p>
                    </div>

                    {/* <div className='py-8 px-3 lg:px-8'>
                        <h1 className=' text-4xl font-sans font-semibold'>Sign in</h1>
                    </div> */}
                    <div className='bg-[#181D3D]'>

                        <div className='py-4 lg:px-8 px-3  text-4xl font-sans bg-[#e9e2de] text-[#102A43] text-start items-center flex justify-start rounded-tr-[28px]'>
                            <p className=' text-4xl font-sans font-semibold'>Login</p>
                        </div>
                    </div>

                    <div className='text-center flex py-1 px-2 justify-center h-8'>
                        <p ref={domItem} className=' w-80 rounded-md'>
                            {message}
                        </p>
                    </div>

                    <form onSubmit={e => e.preventDefault()} action="" className='grid pb-2 px-2 lg:px-8 grid-cols-1 gap-y-4 '>
                        {/* Email */}
                        <div className='bg-white px-4 space-x-1 py-[2pxa] rounded-full flex justify-center items-center '>

                            <FiMail className='h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-400 transition-all ease-in-out duration-300' />
                            <input
                                placeholder='Email'
                                value={values.email}
                                onChange={handleChange}
                                className='rounded-3xl text-gray-700 h-14 focus:ring-white border-white w-full focus:border-white'
                                type="email"
                                name="email" />
                        </div>


                        {/* password */}


                        <div className='relative bg-white space-x-1 px-4 py-[2px] rounded-full flex justify-center items-center '>

                            <MdVpnKey className='h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-400 transition-all ease-in-out duration-300' />

                            <div
                                onClick={() => setshowpass(!showpass)}
                                className=" flex absolute right-2 inset-y-0 items-center cursor-pointer pr-3 text-gray-600 transition-all duration-200 "
                            >
                                {showpass ? (
                                    <BiShow className="w-6 h-6 antialiased" />
                                ) : (
                                    <BiHide className="w-6 h-6 antialiased" />
                                )}
                            </div>

                            <input
                                placeholder='Password'
                                value={values.password}
                                onChange={handleChange} className='rounded-3xl focus:ring-white border-white text-gray-700  w-full h-14 focus:border-white'
                                type={showpass ? 'text' : 'password'}
                                name="password" />
                        </div>

                        {/* submit Button */}
                        <div className='flex justify-between px-1'>
                            <div className="flex items-center">
                                <label className="flex items-center cursor-pointer">
                                    <div className="relative">
                                        <input type="checkbox" className="sr-only" />
                                        <div className="block transition-all ease-in-out duration-500 bg-[#CCCCCC] w-16 h-9 rounded-full"></div>
                                        <div className="dot absolute left-1 top-1 bg-white w-7 h-7 rounded-full transition-all ease-in-out duration-500"></div>
                                    </div>
                                    <div className="ml-3 text-clrgrey5">
                                        Remember Password
                                    </div>
                                </label>
                            </div>
                            <button className=' text-[#429291] ml-2 '  > Forget Password ?</button>
                        </div>

                        <button className='w-full p-1 h-11 mt-4 rounded-3xl text-clrprimary10  transition-all duration-500 bg-clrprimary5 hover:text-clrgrey2 hover:bg-clrprimary7 ease-in-out text-xl font-light ' onClick={loginUser} >Sign In</button>

                    </form>

                    <div className='flex justify-around pb-6'>
                        <p className=' font-sans my-2 text-center text-clrgrey5 '>New to the website?
                        </p>
                        <button className=' text-[#429291] ml-2 font-medium' onClick={() => router.push("/signup")}  > Sign Up Now</button>
                    </div>
                </div>
            </div>
        </>
    )
}

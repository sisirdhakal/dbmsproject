import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BiShow, BiHide } from 'react-icons/bi';
import { FiMail } from 'react-icons/fi'
import { MdVpnKey } from 'react-icons/md'
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router'
import { actionCreators } from '../../states'
import toast from 'react-hot-toast';

export default function Signin() {

    const router = useRouter()
    const initialValue = {
        email: "",
        password: ""
    }

    const [values, setvalues] = useState(initialValue)
    const [showpass, setshowpass] = useState(false);

    const handleChange = (e) => {
        setvalues({ ...values, [e.target.name]: e.target.value })
    }
    const dispatch = useDispatch()
    const { setUserName } = bindActionCreators(actionCreators, dispatch)

    const loginUser = async (e) => {
        e.preventDefault()
        try {
            const { data: { payload }, data } = await axios.post("http://localhost:3000/api/v1/auth/login", values, { withCredentials: true })
            if (payload) {
                localStorage.setItem("isPresent", "true")
                localStorage.setItem("userName", payload.name)
                setUserName(payload.name)
                toast.success(data.msg)
                setTimeout(() => {
                    router.push("/dashboard")
                }, 1000);
            }
        } catch (error) {
            if (error.response?.data.msg) {
                toast.error(error.response.data.msg)
            }
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
            <div className='flex px-2 items-center justify-center h-screen py-5'>

                <div className='w-full hover:shadow-xl shadow-black transition-all ease-linear duration-300 lg:w-[480px]  pb-2 rounded-md bg-[#e9e2de] mx-auto'>

                    <div className='title-container flex items-center justify-center bg-clrgrey3 rounded-bl-[32px] rounded-t-md py-4 px-3'>

                        <p className='logoS text-6xl text-gray-200 px-2'>T</p>
                        <p className='head text-5xl text-center text-white'>ask Manager</p>
                    </div>

                    <div className='bg-clrgrey3 mb-3'>

                        <div className='py-4 lg:px-8 px-3  text-4xl font-sans bg-[#e9e2de] text-[#102A43] text-start items-center flex justify-start rounded-tr-[28px]'>
                            <p className=' text-4xl font-sans font-semibold'>Login</p>
                        </div>
                    </div>

                    <form onSubmit={loginUser} className='grid pb-2 px-2 lg:px-8 grid-cols-1 gap-y-4 '>
                        {/* Email */}
                        <div className='bg-white px-4 space-x-1 py-[2pxa] rounded-full flex justify-center items-center '>

                            <FiMail className='h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-400 transition-all ease-in-out duration-300' />
                            <input
                                placeholder='Email'
                                value={values.email}
                                onChange={handleChange}
                                className='rounded-3xl text-gray-700 h-14 focus:ring-white border-white w-full focus:border-white'
                                type="email"
                                name="email"
                                required />
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
                                name="password"
                                required />
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

                        <button className='w-full p-1 h-11 mt-4 rounded-3xl text-white font-medium  transition-all duration-500 bg-clrprimary5 hover:text-clrgrey2 hover:bg-clrprimary7 ease-in-out text-xl ' type='submit' >Sign In</button>

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

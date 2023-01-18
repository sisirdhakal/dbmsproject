import React, { useContext, useState } from 'react'
import { BsPersonFill } from 'react-icons/bs'
import { AiFillCaretDown } from 'react-icons/ai'
import { Divide as Hamburger } from 'hamburger-react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '@/states'
import axios from 'axios'
import toast from 'react-hot-toast'
export default function TopNavbar() {
    const [visible, setvisible] = useState(false)
    const router = useRouter()

    const dispatch = useDispatch()
    const { sidebarToggle: setsidebar } = bindActionCreators(actionCreators, dispatch)
    const { sidebarToggle: sidebar } = useSelector(state => state.dashboard)
    const { userName } = useSelector(state => state.tasks)
    const setValue = () => {
        setsidebar(!sidebar)
    }

    const signOut = async () => {
        try {
            const { data } = await axios.get("http://localhost:3000/api/v1/auth/logout", { withCredentials: true })
            localStorage.clear()
            toast.success(data.msg)
            setTimeout(() => {
                router.push("/")
            }, 1000);

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className='py-10 px-4 h-24 justify-between sticky top-0 border-b-2 bg-clrprimary10 z-50 hidden lg:flex'>
                <div className="menuItem cursor-pointer z-20 h-6 items-center flex justify-center ml-20"  >
                    <Hamburger onToggle={setValue} />
                </div>
                <div className='flex-1'>
                    <p className=' text-3xl -mt-3 text-center head text-gray-800'>Dashboard</p>
                </div>
                <div className='w-48 relative bg-[#F1F5F9] hover:bg-clrprimary8 transition-all duration-500 ease-in-out p-3 h-8 items-center flex justify-center rounded-xl cursor-pointer -mt-1' onClick={() => {
                    visible ? (setvisible(false)) : (setvisible(true))
                }}>
                    <span className='rounded-full flex items-center justify-center p-[4px] bg-clrgrey5'>
                        <BsPersonFill className='text-white' />
                    </span>
                    <p className="font-bold text-clrgrey2 flex-1 text-center">{userName}</p>
                    <AiFillCaretDown className='text-clrgrey2' />

                    {visible && <div className='absolute flex items-center justify-center rounded-xl mt-[78px] z-20 bg-teal-400 w-48 h-8 hover:bg-teal-700 transition-all duration-500 ease-in-out' onClick={signOut}>
                        <button className='text-white '>Logout</button>
                    </div>}
                </div>
            </div>
        </>
    )
}
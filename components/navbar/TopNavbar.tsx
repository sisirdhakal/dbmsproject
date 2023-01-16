import React, { useContext, useState } from 'react'
import { BsPersonFill } from 'react-icons/bs'
import { AiFillCaretDown } from 'react-icons/ai'
import { Divide as Hamburger } from 'hamburger-react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '@/states'
export default function TopNavbar() {

    const [user] = useState("username")
    const [visible, setvisible] = useState(false)

    const dispatch = useDispatch()
    const { sidebarToggle: setsidebar } = bindActionCreators(actionCreators, dispatch)
    const { sidebarToggle: sidebar } = useSelector(state => state.dashboard)

    const history = useRouter()
    const setValue = () => {
        setsidebar(!sidebar)
    }

    const signOut = () => {
        localStorage.clear()
        history.push("/")
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
                <div className='w-48 relative bg-[#424974] hover:bg-[#181D3D] transition-all duration-500 ease-in-out p-3 h-8 items-center flex justify-center rounded-xl cursor-pointer -mt-1' onClick={() => {
                    visible ? (setvisible(false)) : (setvisible(true))
                }}>
                    <span className='rounded-full flex items-center justify-center p-[4px] bg-gray-200'>
                        <BsPersonFill className='' />
                    </span>
                    <p className="font-semibold text-white flex-1 text-center">{user}</p>
                    <AiFillCaretDown className='text-white' />

                    {visible && <div className='absolute flex items-center justify-center rounded-xl mt-[78px] z-20 bg-teal-400 w-48 h-8 hover:bg-teal-700 transition-all duration-500 ease-in-out' onClick={signOut}>
                        <button className='text-white '>Logout</button>
                    </div>}
                </div>
            </div>
        </>
    )
}
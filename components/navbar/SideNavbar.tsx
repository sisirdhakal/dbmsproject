import React, { useContext, useEffect, useState } from 'react'
// import logo from '../../assets/images/download'
import { ImStatsBars, ImProfile } from 'react-icons/im'
import { MdQueryStats } from "react-icons/md"
import { AiOutlineFileDone } from 'react-icons/ai'
import axios from 'axios'
import SetActiveContext from '../../contexts/SetActiveContext'
import ToggleContext from '../../contexts/ToggleContext'
import { useRouter } from 'next/router'
import Link from 'next/link'


export default function SideNavbar() {
    // const [activeComp, setactiveComp] = useState("")

    const { activeComp: { value: activeComp }, setActiveComp } = useContext(SetActiveContext)
    const [user] = useState("user")

    const { setToggleState } = useContext(ToggleContext)
    const [visible, setvisible] = useState(false)

    const router = useRouter()

    useEffect(() => {

        const comp = router.pathname.split('/dashboard/')[1]


        comp ? (setActiveComp(comp)) : (setActiveComp("addTask"))


        //eslint-disable-next-line
    }, [])

    return (
        <>
            <div className='sticky top-0 hidden h-full lg:block bg-slate-100 '>
                <div className='title-container flex items-center justify-center py-4 '>
                    <p className='logo text-6xl text-gray-700 px-2'>T</p>
                    <Link href="/dashboard"> <p className='head text-4xl text-center cursor-pointer text-[#181D3D]'>asks-M</p></Link>
                </div>

                {/* icons */}

                <div id='item' className="grid space-y-1 mt-10">
                    <Link href={"/dashboard"}>
                        <div className={`px-10 py-3 flex items-center cursor-pointer hover:bg-[#F0F4F8] hover:pl-[56px] duration-300 ease-in-out transition-spacing navLink text-gray-500 ${activeComp === "addTask" ? "active" : (console.log(activeComp))}`} id='stats'>
                            <ImStatsBars className="icon h-7 w-7  transition-all duration-300 ease-in-out " id='dashboard' />
                            <p className='transition-all  duration-500 ease-in-out text-lg' id='stats'  >Add Task</p>
                        </div>
                    </Link>
                    <Link href={"/tasks"}>
                        <div className={`px-10 py-3 flex items-center cursor-pointer hover:bg-[#F0F4F8] hover:pl-[56px] transition-all duration-300 ease-in-out navLink text-gray-500 ${activeComp === "tasks" ? "active" : ""}`} id="all" >
                            <MdQueryStats className="icon h-7 w-7 transition-all duration-300 ease-in-out " id='all' />
                            <p className='transition-all duration-500 ease-in-out text-lg ' id='alljobs'  >My Tasks</p>
                        </div>
                    </Link>
                </div>
            </div>


        </>
    )
}
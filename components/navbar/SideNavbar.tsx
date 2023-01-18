import React, { useContext, useEffect, useState } from 'react'
import { ImStatsBars, ImProfile } from 'react-icons/im'
import { MdQueryStats } from "react-icons/md"
import SetActiveContext from '../../contexts/SetActiveContext'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators } from '@/states'
import { FaTasks, FaLayerGroup } from 'react-icons/fa'
import { BiTask } from 'react-icons/bi'


export default function SideNavbar() {
    // const [activeComp, setactiveComp] = useState("")

    // const { activeComp: { value: activeComp }, setActiveComp } = useContext(SetActiveContext)

    const { sidebarToggle: sidebar } = useSelector(state => state.dashboard)
    const { groupTag } = useSelector(state => state.tasks)

    const router = useRouter()

    // useEffect(() => {

    //     const comp = router.pathname.split('/dashboard/')[1]


    //     comp ? (setActiveComp(comp)) : (setActiveComp("addTask"))

    // }, [])

    return (
        <>
            <div className='sticky top-0 hidden h-full lg:block bg-clrprimary10 '>
                <div className={` flex items-center justify-center transition-all duration-300 ease-in-out ${sidebar ? ("pl-6") : ("")} py-4 `}>
                    <Link href="/dashboard">
                        <span className='logo text-6xl text-gray-700 px-2'>
                            T
                        </span>
                        {sidebar && <span className="head overflow-hidden whitespace-nowrap font-semibold  transition-all duration-300 ease-in-out text-4xl text-center cursor-pointer text-[#181D3D]">asks-M</span>}
                    </Link>
                </div>

                {/* icons */}
                <div className='mt-10'>
                    {sidebarOptions.map((item) => {
                        return (
                            <Link key={item.id} href={item.url}>
                                <div
                                    key={item.id}
                                    className={`py-2 mb-2 transition-all ease-in-out duration-300 px-3 ${sidebar ? ("hover:pl-7 pl-5") : ("pl-6 hover:pl-7")} flex gap-4 items-center cursor-pointer   ${router.pathname === item.url ? (" text-[#2CB1BC] bg-clrgrey9 pl-7") : ("text-primary-text pl-5 hover:bg-slate-300")} z-40  group`}
                                >
                                    <div className="">
                                        <div className={`transition-all ease-in-out duration-300 relative`}>
                                            <span className={`${router.pathname === item.url ? (" text-[#2CB1BC]") : ("")}`}>{item.icon}</span>
                                            {
                                                !sidebar && <p className={`font-semibold group-hover:opacity-100 ${router.pathname === item.url ? (" text-red-400 ") : ("text-[#2cb1bc]")} opacity-0 pl-[52px] -mt-6 absolute truncate capitalize text-lg text-end`}>
                                                    {item.name}
                                                </p>
                                            }
                                        </div>
                                    </div>
                                    <div className="overflow-hidden ml-1 whitespace-nowrap font-semibold capitalize transition-all duration-500 ease-in-out text-lg">
                                        {item.name}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <div className='mt-8'>
                    <div className='px-2 flex items-center mb-4'>
                        <div className='border-t-2 pt-2 pl-4 gap-5 grid grid-cols-sidebar items-center border-clrgrey6 w-full'>

                            <FaTasks className="icon  h-5 w-5 text-clrgrey5 transition-all duration-300 ease-in-out " />
                            <p className=' text-clrgrey5 text-start text-xl font-semibold'>Groups </p>
                        </div>
                    </div>
                    {
                        groupTag.length > 0 && groupTag.map((item) => {
                            return (
                                <Link key={item} href={item}>
                                    <div
                                        className={`py-2 mb-2 transition-all ease-in-out duration-300 px-3 ${sidebar ? ("hover:pl-7 pl-5") : ("pl-6 hover:pl-7")} flex gap-4 items-center cursor-pointer   ${router.pathname === item ? (" text-[#2CB1BC] bg-clrgrey9 pl-7") : ("text-primary-text pl-5 hover:bg-slate-300")} z-40  group`}
                                    >
                                        <div className="">
                                            <div className={`transition-all ease-in-out duration-300 relative`}>
                                                <span className={`${router.pathname === item ? (" text-[#2CB1BC]") : ("text-red-500")}`}>
                                                    <FaLayerGroup className="icon h-6 w-6  transition-all duration-300 ease-in-out " />
                                                </span>
                                                {
                                                    !sidebar && <p className={`font-semibold group-hover:opacity-100 ${router.pathname === item ? (" text-red-400 ") : ("text-[#2cb1bc]")} opacity-0 pl-[52px] -mt-6 absolute truncate capitalize text-lg text-end`}>
                                                        {item}
                                                    </p>
                                                }
                                            </div>
                                        </div>
                                        <div className="overflow-hidden ml-1 whitespace-nowrap font-semibold capitalize transition-all duration-500 ease-in-out text-lg">
                                            {item}
                                        </div>
                                    </div>

                                </Link>
                            );
                        })}
                </div>

            </div>


        </>
    )
}

export const sidebarOptions = [
    {
        id: 1,
        icon: <ImStatsBars className="icon h-7 w-7  transition-all duration-300 ease-in-out " />,
        url: "/dashboard",
        name: "Add Task",

    },
    {
        id: 2,
        icon: <MdQueryStats className="icon h-7 w-7  transition-all duration-300 ease-in-out " />,
        url: "/dashboard/tasks",
        name: "My Tasks",

    },
    {
        id: 2,
        icon: <BiTask className="icon h-7 w-7  transition-all duration-300 ease-in-out " />,
        url: "/dashboard/completed",
        name: "Completed",

    },
]
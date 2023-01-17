import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SideNavbar from '../navbar/SideNavbar'
import TopNavbar from '../navbar/TopNavbar'

export function DashboardLayout({ children }) {

    const { sidebarToggle: sidebar } = useSelector(state => state.dashboard)

    const router = useRouter()

    const [user, setuser] = useState(false)

    useEffect(() => {
        const user = localStorage.getItem("isPresent")

        if (!user) {
            router.push("/")
        }
        else {
            setuser(true)
        }
    }, [])




    return (
        <>
            {user && <div className='flex h-screen'>
                <div className={`${sidebar ? ("w-60") : ("w-20")}  transition-all duration-300 ease-in-out  sticky top-0`}>
                    <SideNavbar />
                </div>
                <div className='overflow-y-scroll grid grid-rows-auto w-full'>
                    <TopNavbar />
                    <div className='px-12'>
                        {children}
                    </div>
                </div>
            </div>}
        </>
    )
}
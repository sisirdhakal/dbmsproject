import ToggleContext from '@/contexts/ToggleContext'
import React, { useContext } from 'react'
import SideNavbar from '../navbar/SideNavbar'
import TopNavbar from '../navbar/TopNavbar'

export function DashboardLayout({ children }) {

    const { toggleState: { value } } = useContext(ToggleContext)

    return (
        <>
            <div className='flex h-screen'>
                {/* <div className={`sticky hidden lg:block w-64 ${value?("-ml-64"):("ml-0")} transition-all ease-in-out duration-300 bg-white top-0 h-screen`}> */}
                <div className={`${value ? ("w-60") : ("w-20")}  transition-all duration-300 ease-in-out  sticky top-0`}>
                    <SideNavbar />
                </div>
                <div className='overflow-y-scroll grid grid-rows-auto w-full'>
                    <TopNavbar />
                    <div className='px-12'>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
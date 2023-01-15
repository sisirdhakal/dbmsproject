import React from 'react'
import SideNavbar from '../navbar/SideNavbar'
import TopNavbar from '../navbar/TopNavbar'

export function DashboardLayout({ children }) {
    return (
        <>
            <div className='flex h-screen'>
                <div className='sticky hidden lg:block bg-white top-0 h-screen'>
                    <SideNavbar />
                </div>
                <div className='overflow-y-scroll grid grid-rows-auto w-full px-12'>
                    <TopNavbar />
                    <div className=''>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
import { DashboardLayout } from '@/components/layout/dashboard';
// import AllTasks from '@/components/Tasks/AllTasks'
import React from 'react'

function Tasks() {
    return (
        <>
            {/* <AllTasks /> */}
            Tasks
        </>
    )
}

Tasks.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default Tasks
import { DashboardLayout } from '@/components/layout/dashboard';
import GetTask from '@/components/Tasks/GetTask';
// import AllTasks from '@/components/Tasks/AllTasks'
import React from 'react'

function Tasks() {
    return (
        <>
            {/* <AllTasks /> */}
            <GetTask />
        </>
    )
}

Tasks.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default Tasks
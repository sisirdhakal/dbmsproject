import { DashboardLayout } from '@/components/layout/dashboard';
import GetTask from '@/components/Tasks/GetTask';
import { useRouter } from 'next/router';
// import AllTasks from '@/components/Tasks/AllTasks'
import React from 'react'
import { useSelector } from 'react-redux';

function Tasks() {

    const { query: { task } } = useRouter()
    const { tasks, completed } = useSelector(state => state.tasks)

    return (
        <>
            {
                task === "completed" ? (
                    <GetTask tasks={completed} />
                ) : (

                    <GetTask tasks={tasks} />
                )
            }
        </>
    )
}
Tasks.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default Tasks
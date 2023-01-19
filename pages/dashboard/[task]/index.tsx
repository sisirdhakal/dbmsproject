import { DashboardLayout } from '@/components/layout/dashboard';
import EditTaskComp from '@/components/Tasks/EditTask';
import GetTask from '@/components/Tasks/GetTask';
import { useRouter } from 'next/router';
// import AllTasks from '@/components/Tasks/AllTasks'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function Tasks() {

    const { query: { task, id } } = useRouter()
    const { tasks, completed, allTasks, edit } = useSelector(state => state.tasks)

    const [groupTasks, setgroupTasks] = useState([])



    useEffect(() => {
        if (id) {
            const tasks = allTasks.filter(
                (task) => task.grouptag === id
            )
            setgroupTasks(tasks)
        }
    }, [id])

    return (
        <>
            {
                edit ? (
                    <EditTaskComp />
                ) : (
                    id ? (
                        <GetTask tasks={groupTasks} />
                    ) : task === "tasks" ? (

                        <GetTask tasks={tasks} />
                    ) : (
                        <GetTask tasks={completed} />
                    )
                )
            }
        </>
    )
}
Tasks.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default Tasks
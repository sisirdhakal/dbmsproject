import { DashboardLayout } from '@/components/layout/dashboard';
import EditTaskComp from '@/components/Tasks/EditTask';
import GetTask from '@/components/Tasks/GetTask';
import { actionCreators } from '@/states';
import { useRouter } from 'next/router';
// import AllTasks from '@/components/Tasks/AllTasks'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

function Tasks() {

    const dispatch = useDispatch()
    const { fetchAllTasks } = bindActionCreators(actionCreators, dispatch)

    const { query: { task, id } } = useRouter()
    const { tasks, completed, allTasks, edit, msg } = useSelector(state => state.tasks)

    const [groupTasks, setgroupTasks] = useState([])

    useEffect(() => {
        fetchAllTasks()
    }, [msg])



    useEffect(() => {
        if (id) {
            const tasks = allTasks.filter(
                (task) => task.grouptag === id
            )
            setgroupTasks(tasks)
        }
    }, [id, msg])

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
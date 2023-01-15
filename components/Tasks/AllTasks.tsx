import React, { useContext } from 'react'
import EditTaskContext from '../../contexts/EditTaskContext'
import EditTask from './EditTask'
import GetTask from './GetTask'

export default function AllTasks() {

    const { editTask: { value } } = useContext(EditTaskContext)

    return (
        <>
            {
                value === true ? (
                    <EditTask />
                ) : (
                    <div className=''>
                        <GetTask />
                    </div>
                )
            }

        </>
    )
}
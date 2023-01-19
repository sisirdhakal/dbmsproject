import React from 'react'
import Task from './Task'

export default function GetTask({ tasks }) {

    return (
        <>
            <div className=' p-3'>
                <div className='bg-slate-100  rounded-md'>
                    <div className=' p-3 grid grid-cols-2 gap-5'>
                        {
                            tasks.map(task => {
                                return (
                                    <Task key={task.id} value={task} />
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

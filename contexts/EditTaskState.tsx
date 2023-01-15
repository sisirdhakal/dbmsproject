import React, { useState } from 'react'
import EditTaskContext from './EditTaskContext'

export default function EditTaskState(props) {

    const value = {
        value: false,
        id: "",
        sort: "latest",
        edited: "",
        status: "",
        deleted: "",
        page: 1,
        activePage: 1
    }

    const [editTask, seteditTask] = useState(value)

    const setEditTask = ({ data, id, query, page, activePage, edited, deleted }) => {

        seteditTask({
            value: data,
            id: id ? (id) : (editTask.id),
            sort: query ? (query.sort) : (editTask.sort),
            edited: edited ? (edited) : (editTask.edited),
            status: query ? (query.status) : (editTask.status),
            textValue: deleted ? (deleted) : (editTask.deleted),
            page: page ? (page) : (editTask.page),
            activePage: activePage ? (activePage) : (editTask.activePage)
        })

    }

    return (
        <EditTaskContext.Provider value={{ editTask, setEditTask }}>
            {props.children}
        </EditTaskContext.Provider>
    )
}

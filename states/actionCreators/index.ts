
/**
 * userId
 */

import axios from "axios"

export const setUserId = (value) => {

    return (dispatch => {
        dispatch({
            type: "userId",
            payload: value
        })
    })
}

export const sidebarToggle = (value) => dispatch => {
    dispatch({ type: "SIDEBARTOGGLE", payload: value })
}

export const setUserName = (userName) => {
    // console.log(userName)

    return (dispatch => {
        dispatch({
            type: "userName",
            payload: userName
        })
    }
    )

}

export const setJwtToken = (token) => {
    return (
        dispatch => {
            dispatch({
                type: "token",
                token: token
            })
        }
    )
}

export const setDeleted = (deleted) => {
    return (
        dispatch => {
            dispatch(
                {
                    type: "deleted",
                    deleted: deleted
                }
            )
        }
    )
}
export const setEditId = (editId) => {
    return (
        dispatch => {
            dispatch(
                {
                    type: "editId",
                    editId: editId
                }
            )
        }
    )
}

export const fetchAllTasks = (url) => async dispatch => {
    try {
        const { data: { msg, tasks } } = await axios.get("http://localhost:3000/api/v1/tasks", { withCredentials: true })
        dispatch({ type: "GetTasksSuccess", payload: { msg, tasks } })
    } catch (error) {
        console.log(error)
        dispatch({ type: "updateMessage", payload:"test" })
    }
}
export const setMessage = (msg) => async dispatch => {

    dispatch({ type: "updateMessage", payload: msg })

}
export const setEditTask = (task) => async dispatch => {

    dispatch({ type: "editTask", payload: task })

}
export const setEditSuccess = () => async dispatch => {

    dispatch({ type: "editSuccess" })

}



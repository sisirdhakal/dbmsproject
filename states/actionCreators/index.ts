
/**
 * userId
 */

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

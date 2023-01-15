
/**
 * userId
 */

export const setUserId=(userId)=>{

    return(dispatch=>{
        dispatch({
            type:"userId",
            userId:userId
        })
    })
}

export const setUserName=(userName)=>{
    // console.log(userName)

    return(dispatch=>{
            dispatch({
                type:"userName",
                userName:userName
            })
        }
    )

}

export const setJwtToken=(token)=>{
    return(
        dispatch=>{
            dispatch({
                type:"token",
                token:token
            })
        }
    )
}

export const setDeleted=(deleted)=>{
    return (
        dispatch=>{
            dispatch(
                {
                    type:"deleted",
                    deleted:deleted
                }
            )
        }
    )
}
export const setEditId=(editId)=>{
    return (
        dispatch=>{
            dispatch(
                {
                    type:"editId",
                    editId:editId
                }
            )
        }
    )
}

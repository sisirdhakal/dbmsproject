const editId = (state = null, action) => {

    if (action.type === "editId") {
        return action.editId
    }

    else {
        return state
    }

}

export default editId
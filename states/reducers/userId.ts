const userId = (state = null, action) => {

    if (action.type === "userId") {
        return action.userId
    }

    else {
        return state
    }

}

export default userId
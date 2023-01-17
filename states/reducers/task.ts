
const tasks_reducer = (state = {
    tasks: [],
    singleTask: "",
    editTask: ""
}, action) => {
    if (action.type === "register") {
        return { ...state, toggleAuth: "register" }
    }
    else {
        return state;
    }
    // throw new Error(`No Matching "${action.type}" - action type`)
}

export default tasks_reducer


const tasks_reducer = (state = {
    tasks: [],
    singleTask: "",
    editTask: "",
    userName: ""
}, action) => {
    if (action.type === "userName") {
        return { ...state, userName: action.payload }
    }
    else {
        return state;
    }
    // throw new Error(`No Matching "${action.type}" - action type`)
}

export default tasks_reducer

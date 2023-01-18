import { getUniqueValues } from "@/utils/helpers"

const tasks_reducer = (state = {
    tasks: [],
    singleTask: "",
    editTask: "",
    userName: "",
    groupTag: [],
    msg: ""
}, action) => {
    if (action.type === "userName") {
        return { ...state, userName: action.payload }
    }
    if (action.type === "GetTasksSuccess") {
        const { msg, tasks } = action.payload
        const groupTag = getUniqueValues(tasks, 'grouptag')
        return {
            ...state,
            msg: msg,
            tasks,
            groupTag
        }
    }
    else {
        return state;
    }
    // throw new Error(`No Matching "${action.type}" - action type`)
}

export default tasks_reducer

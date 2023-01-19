import { getUniqueValues } from "@/utils/helpers"

const tasks_reducer = (state = {
    tasks: [],
    allTasks: [],
    completed: [],
    groupTag: [],
    groupTasks: [],
    msg: "",
    editTask: {},
    edit: false
}, action) => {
    if (action.type === "userName") {
        return { ...state, userName: action.payload }
    }
    if (action.type === "GetTasksSuccess") {
        const { msg, tasks: allTasks } = action.payload
        const groupTag = getUniqueValues(allTasks, 'grouptag')
        const completed = allTasks.filter(
            (task) => task.status === 1
        )
        const tasks = allTasks.filter(
            (task) => task.status === 0
        )
        return {
            ...state,
            msg: msg,
            tasks,
            groupTag,
            completed,
            allTasks
        }
    }
    if (action.type === "updateMessage") {
        return {
            ...state,
            msg: action.payload
        }
    }
    if (action.type === "editTask") {
        return {
            ...state,
            editTask: action.payload,
            edit: true
        }
    }
    if (action.type === "editSuccess") {
        return {
            ...state,
            editTask: {},
            edit: false
        }
    }
    else {
        return state;
    }
    // throw new Error(`No Matching "${action.type}" - action type`)
}

export default tasks_reducer

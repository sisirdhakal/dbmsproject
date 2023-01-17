import { combineReducers } from "redux";
import dashboard_reducer from "./dashboard";
import tasks_reducer from "./task";


const reducers = combineReducers({
    tasks:tasks_reducer,
    dashboard: dashboard_reducer

})

export default reducers
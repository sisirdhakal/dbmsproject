import { combineReducers } from "redux";
import userId from "./userId";
import userName from "./userName";
import token from './jwtToken'
import deleted from "./deleted";
import editId from "./editId";
import dashboard_reducer from "./dashboard";


const reducers = combineReducers({
    userId: userId,
    userName: userName,
    token: token,
    deleted: deleted,
    editId: editId,
    dashboard: dashboard_reducer

})

export default reducers
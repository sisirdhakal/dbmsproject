const token = (state = null, action) => {

    if (action.type === "token") 
    {
        return action.token
    }
    else
    {
        return state;
    }
}
export default token
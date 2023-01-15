const deleted=(state=null,action)=>
{
    if(action.type==="deleted")
    {
        return action.deleted
    }
    else
    {
        return state
    }
}
export default deleted

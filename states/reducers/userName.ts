const userName = (state = null, action) => {

    // console.log(action,"action of reducer")
    // console.log(state,"inside reducer")

    if (action.type === "userName") {
        // console.log(action.value,"inside if of reducer")
        return action.userName;
    }

    else {
        // console.log('inside else')
        return state;
    }

}
export default userName
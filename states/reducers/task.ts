
const tasks_reducer = (state = {
    toggleAuth: "login",
    isSidebarOpen: false,
    products_loading: false,
    products_error: false,
    products: [],
    featured_products: [],
    single_product_loading: false,
    single_product_error: false,
    single_product: {},
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

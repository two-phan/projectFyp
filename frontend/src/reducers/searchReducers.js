// reducers/productReducers.js
export const searchReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case 'SEARCH_PRODUCTS_REQUEST':
            return { loading: true, products: [] }
        case 'SEARCH_PRODUCTS_SUCCESS':
            return { loading: false, products: action.payload }
        case 'SEARCH_PRODUCTS_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
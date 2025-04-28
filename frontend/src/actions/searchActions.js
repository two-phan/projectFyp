import axios from 'axios'
import { SEARCH_PRODUCTS_REQUEST, SEARCH_PRODUCTS_SUCCESS, SEARCH_PRODUCTS_FAIL } from '../constants/searchConstants'



export const searchProducts = (keyword) => async (dispatch) => {
    try {
        dispatch({ type: SEARCH_PRODUCTS_REQUEST })
        
        const { data } = await axios.get(`/api/search/?q=${keyword}`)
        
        dispatch({
            type: SEARCH_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SEARCH_PRODUCTS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
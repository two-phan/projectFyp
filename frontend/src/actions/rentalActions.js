import axios from "axios";
import { RENTAL_LIST_REQUEST, RENTAL_LIST_SUCCESS, RENTAL_LIST_FAIL, RENTAL_DETAILS_REQUEST, RENTAL_DETAILS_SUCCESS, RENTAL_DETAILS_FAIL } from "../constants/rentalConstants";

export const listRentals = () => async (dispatch) => {
    try {
        dispatch({ type: RENTAL_LIST_REQUEST });
        const { data } = await axios.get("/api/rentals");
        dispatch({
            type: RENTAL_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: RENTAL_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}   

export const listRentalDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: RENTAL_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/rentals/${id}`);
        dispatch({
            type: RENTAL_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.error("Error fetching rental details:", error);
        dispatch({
            type: RENTAL_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}
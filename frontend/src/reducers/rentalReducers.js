import { RENTAL_LIST_REQUEST, RENTAL_LIST_SUCCESS, RENTAL_LIST_FAIL,  RENTAL_DETAILS_REQUEST, RENTAL_DETAILS_SUCCESS, RENTAL_DETAILS_FAIL } from "../constants/rentalConstants";  

export const rentalListReducers = (state = { rentals: [] }, action) => {
    switch (action.type) {
        case RENTAL_LIST_REQUEST:
            return { loading: true, rentals: [] };
        case RENTAL_LIST_SUCCESS:
            return { loading: false, rentals: action.payload };
        case RENTAL_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}


export const rentalDetailsReducers = (state = { rental:  []  }, action) => {
    switch (action.type) {
        case RENTAL_DETAILS_REQUEST:
            return { loading: true, ...state };
        case RENTAL_DETAILS_SUCCESS:
            return { loading: false, rental: action.payload };
        case RENTAL_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

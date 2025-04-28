import {
    ADD_TO_RENTAL_CART,
    REMOVE_FROM_RENTAL_CART,
  } from "../constants/rentalCartConstants";
  
  export const rentalCartReducer = (
    state = { rentalItems: [] },
    action
  ) => {
    switch (action.type) {
      case ADD_TO_RENTAL_CART:
        const item = action.payload;
        const existItem = state.rentalItems.find(
          (x) => x.rental === item.rental
        );
  
        if (existItem) {
          return {
            ...state,
            rentalItems: state.rentalItems.map((x) =>
              x.rental === existItem.rental ? item : x
            ),
          };
        } else {
          return {
            ...state,
            rentalItems: [...state.rentalItems, item],
          };
        }
  
      case REMOVE_FROM_RENTAL_CART:
        return {
          ...state,
          rentalItems: state.rentalItems.filter(
            (x) => x.rental !== action.payload
          ),
        };
  
      default:
        return state;
    }
  };
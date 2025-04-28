import axios from "axios";
import { 
  ADD_TO_RENTAL_CART, 
  REMOVE_FROM_RENTAL_CART 
} from "../constants/rentalCartConstants";

export const addToRentalCart = (id, duration) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/rentals/${id}`);
  
  dispatch({
    type: ADD_TO_RENTAL_CART,
    payload: {
      rental: data._id,
      name: data.rentalname,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      duration,
    },
  });

  localStorage.setItem(
    "rentalItems",
    JSON.stringify(getState().rentalCart.rentalItems)
  );
};

export const removeFromRentalCart = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_RENTAL_CART,
    payload: id,
  });

  localStorage.setItem(
    "rentalItems",
    JSON.stringify(getState().rentalCart.rentalItems)
  );
};
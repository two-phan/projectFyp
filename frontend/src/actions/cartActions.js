import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
} from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.productname,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}
export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    }

// Save shipping address action
export const saveShippingAddress = (data) => (dispatch) => {
  // Save to localStorage
  localStorage.setItem('shippingAddress', JSON.stringify(data));

  // Dispatch action
  dispatch({
    type: 'CART_SAVE_SHIPPING_ADDRESS',
    payload: data,
  });
};

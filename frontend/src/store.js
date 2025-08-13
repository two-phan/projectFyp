// frontend/src/store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsListReducers, productDetailsReducers } from './reducers/productsReducers';
import { userLoginReducers, userSignupReducers } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import { categoryListReducer, categoryProductsReducer } from './reducers/categoryReducers';
import { rentalListReducers, rentalDetailsReducers } from './reducers/rentalReducers';
import { searchReducer } from './reducers/searchReducers';
import { rentalCartReducer } from './reducers/rentalcartReducers';
import { orderCreateReducer } from './reducers/orderReducer'; // Ensure correct import

const reducer = combineReducers({
    productsList: productsListReducers,
    productDetails: productDetailsReducers,
    userLogin: userLoginReducers,
    userSignup: userSignupReducers,
    cart: cartReducer,
    categoryList: categoryListReducer,
    categoryProducts: categoryProductsReducer,
    rentalList: rentalListReducers,
    rentalDetails: rentalDetailsReducers,
    productSearch: searchReducer,
    rentalCart: rentalCartReducer,
    orderCreate: orderCreateReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

const rentalItemsFromStorage = localStorage.getItem('rentalItems')
    ? JSON.parse(localStorage.getItem('rentalItems'))
    : [];

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {};

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },
    rentalCart: { rentalItems: rentalItemsFromStorage },
    orderCreate: { loading: false, success: false, order: null, error: null }, // Initialize orderCreate
};

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
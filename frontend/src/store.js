import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsListReducers } from './reducers/productsReducers';
import { productDetailsReducers } from './reducers/productsReducers';
import { userLoginReducers, userSignupReducers } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import { categoryListReducer, categoryProductsReducer } from './reducers/categoryReducers';
import { rentalListReducers } from './reducers/rentalReducers';
import { rentalDetailsReducers } from './reducers/rentalReducers';
import { searchReducer } from './reducers/searchReducers';
import { rentalCartReducer } from './reducers/rentalcartReducers';

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

});

const cartItemsFromStorage = localStorage.getItem("cartItems") ? 
    JSON.parse(localStorage.getItem("cartItems")) : [];

const rentalItemsFromStorage = localStorage.getItem("rentalItems") ? 
    JSON.parse(localStorage.getItem("rentalItems")) : [];

const initialState = {
    cart: { cartItems: cartItemsFromStorage },
    rentalCart: { rentalItems: rentalItemsFromStorage },
};

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
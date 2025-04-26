import {createStore,combineReducers,applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsListReducers } from './reducers/productsReducers';
import { productDetailsReducers } from './reducers/productsReducers';
import { userLoginReducers, userSignupReducers } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import { categoryListReducer, categoryProductsReducer } from './reducers/categoryReducers';
import { rentalListReducers } from './reducers/rentalReducers';


const reducer = combineReducers({
    productsList: productsListReducers,
    productDetails: productDetailsReducers,
    userLogin: userLoginReducers,
    userSignup: userSignupReducers,
    cart: cartReducer,
    categoryList: categoryListReducer,
    categoryProducts: categoryProductsReducer,
    rentalList: rentalListReducers,
})
const cartItemsFromStorage = localStorage.getItem("cartItems") ? 
JSON.parse(localStorage.getItem("cartItems")) : []


const initialState = {
    cart: { cartItems: cartItemsFromStorage },
}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;
import {createStore,combineReducers,applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsListReducers } from './reducers/productsReducers';
import { productDetailsReducers } from './reducers/productsReducers';
import { userLoginReducers, userSignupReducers } from './reducers/userReducers';

const reducer = combineReducers({
    productsList: productsListReducers,
    productDetails: productDetailsReducers,
    userLogin: userLoginReducers,
    userSignup: userSignupReducers,
})

const initialState = {}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;
import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,
    CATEGORY_PRODUCTS_REQUEST,
    CATEGORY_PRODUCTS_SUCCESS,
    CATEGORY_PRODUCTS_FAIL,
  } from "../constants/categoryConstants";
  
  // Initial state with loading property
  const initialCategoryListState = {
    loading: false,
    categories: [],
    error: null
  };
  
  export const categoryListReducer = (state = initialCategoryListState, action) => {
    switch (action.type) {
      case CATEGORY_LIST_REQUEST:
        return { ...state, loading: true };
      case CATEGORY_LIST_SUCCESS:
        return { loading: false, categories: action.payload};
      case CATEGORY_LIST_FAIL:
        return { loading: false, error: action.payload, categories: [] };
      default:
        return state;
    }
  };
  
  // Initial state for products
  const initialCategoryProductsState = {
    loading: false,
    products: [],
    error: null
  };
  
  export const categoryProductsReducer = (state = initialCategoryProductsState, action) => {
    switch (action.type) {
      case CATEGORY_PRODUCTS_REQUEST:
        return { ...state, loading: true };
      case CATEGORY_PRODUCTS_SUCCESS:
        return { loading: false, products: action.payload, error: null };
      case CATEGORY_PRODUCTS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
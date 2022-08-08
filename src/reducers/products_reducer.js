import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const products_reducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, sideOpen: true };
  }
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, sideOpen: false };
  }
  if (action.type === GET_PRODUCTS_BEGIN) {
    return {...state, store_loading: true}
  }
  if(action.type === GET_PRODUCTS_SUCCESS) {
    const featured = action.payload.filter((item) => item.featured === true)
    
    return {...state, store_loading:false, store: action.payload, featured}
  }
  if(action.type === GET_PRODUCTS_ERROR) {
    return {...state, store_loading: false, store_error: true}
  }
  if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    return {...state, single_loading: true, single_error: false}
  }
  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {...state, single_loading: false,  single: action.payload}
  }
  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return {...state, single_loading: false, single_error: true}
  }
    throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
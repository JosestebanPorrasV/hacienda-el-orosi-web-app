import { Types } from '../types/Types';

const initialState = {
  products: [],
  currentProduct: null
};

export const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.PRODUCTS_LOADED:
      return {
        ...state,
        products: [...action.payload.products]
      };

    case Types.ADD_NEW_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload]
      };

    case Types.UPDATED_PRODUCT:
      return {
        ...state,
        products: state.products.map((e) => (e._id === action.payload._id ? action.payload : e))
      };

    case Types.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((e) => e._id !== state.currentProduct._id),
        currentProduct: null
      };

    case Types.PRODUCT_SET_ACTIVE:
      return {
        ...state,
        currentProduct: action.payload
      };

    case Types.PRODUCT_CLEAR_ACTIVE:
      return {
        ...state,
        currentProduct: null
      };

    default:
      return state;
  }
};

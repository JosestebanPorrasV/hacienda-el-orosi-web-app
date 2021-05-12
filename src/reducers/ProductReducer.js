import { Types } from "../types/Types";

const initialState = {
    products: [],
    count: 0,
    currentProduct: null,
}

export const ProductReducer = (state = initialState, action) =>{
    switch (action.type) {
        case Types.PRODUCTS_LOADED:
            return{
                ...state,
                products: [...action.payload.products],
                count: action.payload.count,
            };
        
        case Types.ADD_NEW_PRODUCT:
            return{
                ...state,
                products: [...state.products, action.payload],
            };

        case Types.DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter((e) => e._id !== state.currentProduct._id),
                currentProduct: null,
            };

        case Types.PRODUCT_SET_ACTIVE:
            return{
                ...state,
                currentProduct: action.payload,
            };

        case Types.PRODUCT_CLEAR_ACTIVE:
            return{
                ...state,
                currentProduct: null,
            }

            default:
                return state;
    }
}
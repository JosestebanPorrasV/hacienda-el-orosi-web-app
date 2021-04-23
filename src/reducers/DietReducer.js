import { Types } from "../types/Types";

const initialState = {
  diets: [],
  products: [],
  aliments: [],
  count: 0,
  currentDiet: null,
  currentAliment: null,
  currentProduct: null,
};

export const DietReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.DIETS_LOADED:
      return {
        ...state,
        diets: [...action.payload.diets],
      };

    case Types.ALIMENTS_LOADED:
      return {
        ...state,
        aliments: [...action.payload.aliments],
        count: action.payload.count,
      };

    case Types.PRODUCTS_LOADED:
      return {
        ...state,
        products: [...action.payload.products],
        count: action.payload.count,
      };

    case Types.ADD_NEW_DIET:
      return {
        ...state,
        diets: [...state.diets, ...action.payload],
      };

    case Types.ADD_NEW_ALIMENT:
      return {
        ...state,
        aliments: [...state.aliments, ...action.payload],
      };

    case Types.ADD_NEW_PRODUCT:
      return {
        ...state,
        products: [...state.products, ...action.payload],
      };

    case Types.DIET_SET_ACTIVE:
      return {
        ...state,
        currentDiet: action.payload,
      };

    case Types.DIET_CLEAR_ACTIVE:
      return {
        ...state,
        currentDiet: null,
      };

    case Types.ALIMENT_SET_ACTIVE:
      return {
        ...state,
        currentAnimal: action.payload,
      };

    case Types.ALIMENT_CLEAR_ACTIVE:
      return {
        ...state,
        currentAnimal: null,
      };

    case Types.PRODUCT_SET_ACTIVE:
      return {
        ...state,
        currentProduct: action.payload,
      };

    case Types.PRODUCT_CLEAR_ACTIVE:
      return {
        ...state,
        currentProduct: null,
      };

    default:
      return state;
  }
};

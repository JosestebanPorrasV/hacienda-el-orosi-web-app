import { Types } from "../types/Types";

const initialState = {
  diets: [],
  aliments: [],
  count: 0,
  currentDiet: null,
  currentAliment: null,
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

    default:
      return state;
  }
};

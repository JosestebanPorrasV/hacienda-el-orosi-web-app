import { Types } from '../types/Types';

const initialState = {
  diets: [],
  aliments: [],
  currentDiet: null,
  currentAliment: null
};

export const DietReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.DIETS_LOADED:
      return {
        ...state,
        diets: [...action.payload.diets]
      };

    case Types.ALIMENTS_LOADED:
      return {
        ...state,
        aliments: [...action.payload.aliments]
      };

    case Types.ADD_NEW_DIET:
      return {
        ...state,
        diets: [...state.diets, action.payload]
      };

    case Types.ADD_NEW_ALIMENT:
      return {
        ...state,
        aliments: [...state.aliments, action.payload]
      };

    case Types.UPDATED_ALIMENT:
      return {
        ...state,
        aliments: state.aliments.map((e) => (e._id === action.payload._id ? action.payload : e))
      };

    case Types.DELETE_DIET:
      return {
        ...state,
        diets: state.diets.filter((e) => e._id !== state.currentAnimal._id),
        currentAnimal: null
      };

    case Types.DELETE_ALIMENT:
      return {
        ...state,
        aliments: state.aliments.filter((e) => e._id !== state.currentAliment._id),
        currentAliment: null
      };

    case Types.DIET_SET_ACTIVE:
      return {
        ...state,
        currentDiet: action.payload
      };

    case Types.DIET_CLEAR_ACTIVE:
      return {
        ...state,
        currentDiet: null
      };

    case Types.ALIMENT_SET_ACTIVE:
      return {
        ...state,
        currentAliment: action.payload
      };

    case Types.ALIMENT_CLEAR_ACTIVE:
      return {
        ...state,
        currentAliment: null
      };

    default:
      return state;
  }
};

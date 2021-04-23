import { Types } from "../types/Types";

const initialState = {
  animals: [],
  animalsTypes: [],
  currentAnimal: null,
  currentSearch: null,
  currentType: null,
  total: 0,
};

export const AnimalReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.TYPES_LOADED:
      return {
        ...state,
        animalsTypes: action.payload.types,
      };

    case Types.ANIMALS_LOADED:
      return {
        ...state,
        animals: [...action.payload.animals],
      };

    case Types.REGISTER_TYPE_ANIMAL_SUCCESS:
      return {
        ...state,
        animalsTypes: [...state.animalsTypes, action.payload],
      };

    case Types.DELETE_TYPE:
      return {
        ...state,
        animalsTypes: state.animalsTypes.filter(
          (e) => e._id !== action.payload._id
        ),
      };

    case Types.ADD_NEW_ANIMAL:
      return {
        ...state,
        animals: [...state.animals, action.payload],
      };

    case Types.UPDATE_ANIMAL:
      return {
        ...state,
        animals: state.animals.map((e) =>
          e._id === action.payload._id ? action.payload : e
        ),
      };

    case Types.TYPE_SET_ACTIVE:
      return {
        ...state,
        currentType: state.animalsTypes.find((e) => e._id === action.payload),
      };

    case Types.TYPE_CLEAR_ACTIVE:
      return {
        ...state,
        currentType: null,
      };
    case Types.ANIMAL_SET_ACTIVE:
      return {
        ...state,
        currentAnimal: action.payload,
      };
    case Types.SEARCH_SET_ACTIVE:
      return {
        ...state,
        currentSearch: action.payload,
      };

    case Types.SEARCH_CLEAN_ACTIVE:
      return {
        ...state,
        currentSearch: null,
      };

    case Types.ANIMAL_CLEAR_ACTIVE:
      return {
        ...state,
        currentAnimal: null,
      };

    case Types.REGISTER_MILK_SUCCESS:
      return {
        ...state,
        animals: state.animals.map((e) =>
          e._id === action.payload._id ? action.payload : e
        ),
      };

    case Types.REGISTER_WEIGHT_SUCCESS:
      return {
        ...state,
        animals: state.animals.map((e) =>
          e._id === action.payload._id ? action.payload : e
        ),
      };

    case Types.REGISTER_CALVING_SUCCESS:
      return {
        ...state,
        animals: state.animals.map((e) =>
          e._id === action.payload._id ? action.payload : e
        ),
      };

    default:
      return state;
  }
};

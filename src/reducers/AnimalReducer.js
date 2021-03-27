import { Types } from "../types/Types";

const initialState = {
  animals: [],
  AnimalsState: null,
  animalsType: null,
  currentAnimal: null,
  total: 0,
};

export const AnimalReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.ANIMALS_LOADED:
      return {
        ...state,
        animals: [...action.payload.animals],
        AnimalsState: action.payload.AnimalsState,
        animalsType: action.payload.animalsType,
        total: action.payload.total,
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

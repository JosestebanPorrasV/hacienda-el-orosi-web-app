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

    default:
      return state;
  }
};

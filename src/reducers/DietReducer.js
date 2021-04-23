import { Types } from "../types/Types";

const initialState = {
  diets: [],
  aliments: [],
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
        };

    default:
      return state;
  }
};

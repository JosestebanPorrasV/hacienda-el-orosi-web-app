import { Types } from "../types/Types";

const initialState = {
    lends: [],
    count: 0,
    lendsState: '',
    currentLend: ''
}

export const LendReducer = (state = initialState, action) => {
    switch (action.type) {
      case Types.LENDS_LOADED:
        return {
          ...state,
          lends: [...action.payload.lends],
          count: action.payload.count,
          lendsState: action.payload.lendsState,
        };

        case Types.LENDS_LOADED_BY_COLLABORATOR:
          return {
            ...state,
            lends: [...action.payload.lends],
            count: action.payload.count,
            lendsState: null
          };

      default:
        return state;
    }
};
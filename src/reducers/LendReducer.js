import { Types } from "../types/Types";

const initialState = {
    lends: [],
    count: 0,
}

export const LendReducer = (state = initialState, action) => {
    switch (action.type) {
      case Types.LENDS_LOADED:
        return {
          ...state,
          lends: [...action.payload.lends],
          count: action.payload.count,
        };

      default:
        return state;
    }
};
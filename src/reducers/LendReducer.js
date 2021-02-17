import { Types } from "../types/Types";

const initialState = {
    lends: [],
}

export const LendReducer = (state = initialState, action) => {
    switch (action.type) {
      case Types.LEND_LOADED:
        return {
          ...state,
          lends: [...action.payload.lends],
        };

      default:
        return state;
    }
};
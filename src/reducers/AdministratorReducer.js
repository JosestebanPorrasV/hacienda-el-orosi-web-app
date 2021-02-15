import { Types } from "../types/Types";

const initialState = {
  administrators: [],
}

export const AdministratorReducer = (state = initialState, action) => {
    switch (action.type) {
      case Types.ADMINISTRATOR_LOADED:
        return {
          ...state,
          administrators: [...action.payload.administrators],
        };

      default:
        return state;
    }
};

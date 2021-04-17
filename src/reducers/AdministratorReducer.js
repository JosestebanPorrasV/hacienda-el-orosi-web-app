import { Types } from "../types/Types";

const initialState = {
  administrators: [],
  currentAdministrator: null,
};

export const AdministratorReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.ADMINISTRATORS_LOADED:
      return {
        ...state,
        administrators: [...action.payload.administrators],
      };

    case Types.ADD_NEW_ADMINISTRATOR:
      return {
        ...state,
        ...action.payload,
      };

      case Types.DELETE_ADMINISTRATOR:
        return {
          ...state,
          administrators: state.administrators.filter((e) => e._id !== action.payload._id),
        };

    case Types.ADMINISTRATOR_SET_ACTIVE:
      return {
        ...state,
        currentAdministrator: action.payload,
      };

    case Types.ADMINISTRATOR_CLEAR_ACTIVE:
      return {
        ...state,
        currentAdministrator: null,
      };

    default:
      return state;
  }
};

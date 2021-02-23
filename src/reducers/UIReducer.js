import { Types } from "../types/Types";

const initialState = {
  menuOpen: false,
};

export const UIReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.UI_OPEN_MENU:
      return {
        ...state,
        menuOpen: true,
      };
      case Types.UI_CLOSE_MENU:
      return {
        ...state,
        menuOpen: false,
      };
    default:
      return state;
  }
};

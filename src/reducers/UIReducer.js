import { Types } from "../types/Types";

const initialState = {
  menuOpen: false,
  modalOpen: false,
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

      case Types.UI_OPEN_MODAL:
      return {
        ...state,
        modalOpen: true,
      };
      case Types.UI_CLOSE_MODAL:
      return {
        ...state,
        modalOpen: false,
      };
    default:
      return state;
  }
};

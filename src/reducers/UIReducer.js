import { Types } from "../types/Types";

const initialState = {
  menuOpen: false,
  modalFeeOpen: false,
  modalAddLendOpen: false,
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

    case Types.UI_OPEN_MODAL_FEES:
      return {
        ...state,
        modalFeeOpen: true,
      };
    case Types.UI_CLOSE_MODAL_FEES:
      return {
        ...state,
        modalFeeOpen: false,
      };

    case Types.UI_OPEN_MODAL_ADD_LEND:
      return {
        ...state,
        modalAddLendOpen: true,
      };
    case Types.UI_CLOSE_MODAL_ADD_LEND:
      return {
        ...state,
        modalAddLendOpen: false,
      };
    default:
      return state;
  }
};

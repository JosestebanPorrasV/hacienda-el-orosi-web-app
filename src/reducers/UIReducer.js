import { Types } from "../types/Types";

const initialState = {
  menuOpen: false,
  modalAdministratorOpen: false,
  modalCollaboratorOpen: false,
  modalFeeOpen: false,
  modalAddLendOpen: false,
  modalAddToolOpen: false,
  modalActiveOpen: false,
  modalCollaboratorInfoOpen: false,
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

      case Types.UI_OPEN_MODAL_ADMINISTRATOR:
        return {
          ...state,
          modalAdministratorOpen: true,
        };
    case Types.UI_CLOSE_MODAL_ADMINISTRATOR:
        return {
          ...state,
          modalAdministratorOpen: false,
        };

    case Types.UI_OPEN_MODAL_COLLABORATOR:
        return {
          ...state,
          modalCollaboratorOpen: true,
        };
    case Types.UI_CLOSE_MODAL_COLLABORATOR:
        return {
          ...state,
          modalCollaboratorOpen: false,
        };

    case Types.UI_OPEN_MODAL_COLLABORATOR_INFO:
      return {
        ...state,
        modalCollaboratorInfoOpen: true,
      };
    case Types.UI_CLOSE_MODAL_COLLABORATOR_INFO:
      return {
        ...state,
        modalCollaboratorInfoOpen: false,
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

    case Types.UI_OPEN_MODAL_ADD_TOOL:
      return {
        ...state,
        modalAddToolOpen: true,
      };
    case Types.UI_CLOSE_MODAL_ADD_TOOL:
      return {
        ...state,
        modalAddToolOpen: false,
      };

    case Types.UI_OPEN_MODAL_ACTIVES:
      return {
        ...state,
        modalActiveOpen: true,
      };
    case Types.UI_CLOSE_MODAL_ACTIVES:
      return {
        ...state,
        modalActiveOpen: false,
      };

    default:
      return state;
  }
};

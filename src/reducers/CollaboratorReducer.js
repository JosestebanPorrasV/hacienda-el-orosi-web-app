import { Types } from "../types/Types";

const initialState = {
  collaborators: [],
  currentCollaborator: null,
};

export const CollaboratorReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.COLLABORATORS_LOADED:
      return {
        ...state,
        collaborators: [...action.payload.collaborators],
      };
    case Types.ADD_NEW_COLLABORATOR:
      return {
        ...state,
      };

    case Types.COLLABORATOR_SET_ACTIVE:
      return {
        ...state,
        currentCollaborator: action.payload,
      };

    case Types.COLLABORATOR_CLEAR_ACTIVE:
      return {
        ...state,
        currentCollaborator: null,
      };
    default:
      return state;
  }
};

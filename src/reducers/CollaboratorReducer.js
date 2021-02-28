import { Types } from "../types/Types";

const initialState = {
  collaborators: [],
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
              ...state
          }
    default:
      return state;
  }
};

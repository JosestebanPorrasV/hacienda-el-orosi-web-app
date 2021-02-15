import { Types } from "../types/Types";

const initialState = {
  collaborators: [],
  loading: false,
//   currentCollaborator: null,
  count: 0,
};

export const CollaboratorReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.COLLABORATOR_LOADED:
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

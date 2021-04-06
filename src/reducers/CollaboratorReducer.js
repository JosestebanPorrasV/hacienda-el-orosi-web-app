import { Types } from "../types/Types";

const initialState = {
  collaborators: [],
  countCollaborators: 0,
  collaboratorsState: null,
  currentCollaborator: null,
};

export const CollaboratorReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.COLLABORATORS_LOADED:
      return {
        ...state,
        collaborators: [...action.payload.collaborators],
        countCollaborators: action.payload.count,
        collaboratorsState: action.payload.collaboratorsState,
      };
    case Types.ADD_NEW_COLLABORATOR:
      return {
        ...state,
        collaborators: [...state.collaborators, action.payload],
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

    case Types.VALIDATE_PRESENCE_COLLABORATOR:
      return {
        ...state,
        collaborators: state.collaborators.map((e) =>
          e._id === action.payload._id ? action.payload : e
        ),
      };
    default:
      return state;
  }
};

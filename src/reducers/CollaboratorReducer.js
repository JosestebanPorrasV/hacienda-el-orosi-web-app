import { Types } from '../types/Types';

const initialState = {
  collaborators: [],
  collaboratorsState: null,
  currentCollaborator: null,
  liquidate: false
};

export const CollaboratorReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.COLLABORATORS_LOADED:
      return {
        ...state,
        collaborators: [...action.payload.collaborators],
        collaboratorsState: action.payload.collaboratorsState
      };
    case Types.ADD_NEW_COLLABORATOR:
      return {
        ...state,
        collaborators: [...state.collaborators, action.payload]
      };

    case Types.COLLABORATOR_SET_ACTIVE:
      return {
        ...state,
        currentCollaborator: action.payload
      };

    case Types.COLLABORATOR_CLEAR_ACTIVE:
      return {
        ...state,
        currentCollaborator: null
      };

    case Types.LIQUIDATE_SET_ACTIVE:
      return {
        ...state,
        liquidate: true
      };

    case Types.LIQUIDATE_CLEAR_ACTIVE:
      return {
        ...state,
        liquidate: false
      };

    case Types.VALIDATE_PRESENCE_COLLABORATOR:
      return {
        ...state,
        collaborators: state.collaborators.map((e) =>
          e._id === action.payload._id ? action.payload : e
        )
      };

    case Types.COLLABORATOR_CHANGE_STATUS:
      return {
        ...state,
        collaborators: state.collaborators.map((e) =>
          e._id === action.payload._id ? action.payload : e
        )
      };

    default:
      return state;
  }
};

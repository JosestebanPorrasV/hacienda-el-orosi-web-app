import { Types } from "../types/Types";

const initialState = {
  healths: [],
  currentHealth: null,
};

export const HealthReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.HEALTHS_LOADED:
      return {
        ...state,
        healths: [...action.payload.health],
      };

    case Types.ADD_HEALTH:
      return {
        ...state,
        healths: [...state.healths, action.payload.health],
      };

    case Types.UPDATED_HEALTH:
      return {
        ...state,
        healths: state.healths.map((e) =>
          e._id === action.payload._id ? action.payload : e
        ),
      };

      case Types.DELETE_HEALTH:
        return {
          ...state,
          healths: state.healths.filter((e) => e._id !== state.currentHealth._id),
          currentHealth: null
        };

    case Types.HEALTH_SET_ACTIVE:
      return {
        ...state,
        currentHealth: action.payload,
      };

    case Types.HEALTH_CLEAR_ACTIVE:
      return {
        ...state,
        currentHealth: null,
      };

    default:
      return state;
  }
};

import { Types } from '../types/Types';

const initialState = {
  lends: [],
  fees: [],
  lendsState: null,
  currentLend: null
};

export const LendReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.ADD_NEW_LEND:
      return {
        ...state,
        lends: [...state.lends, action.payload]
      };
    case Types.LENDS_LOADED:
      return {
        ...state,
        lends: [...action.payload.lends],
        lendsState: action.payload.lendsState
      };

    case Types.FEES_LOADED:
      return {
        ...state,
        fees: [...action.payload.fees]
      };

    case Types.FEE_LOADED_CLEAR:
      return {
        ...state,
        fees: []
      };

    case Types.LENDS_LOADED_BY_COLLABORATOR:
      return {
        ...state,
        lends: [...action.payload.lends],
        lendsState: null
      };

    case Types.LEND_SET_ACTIVE:
      return {
        ...state,
        currentLend: action.payload
      };

    case Types.LEND_CLEAR_ACTIVE:
      return {
        ...state,
        currentLend: null
      };

    case Types.ADD_FEE_SUCCESS:
      return {
        ...state,
        ...action.payload
      };

    case Types.LEND_CHANGE_FEE:
      return {
        ...state,
        lends: state.lends.map((e) => (e._id === action.payload._id ? action.payload : e))
      };

    default:
      return state;
  }
};

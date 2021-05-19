import { Types } from '../types/Types';

const initialState = {
  payments: [],
  presenceDayByCollaborator: [],
  totalOvertimeByCollaborator: 0,
};

export const PaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.PAYMENTS_LOADED:
      return {
        ...state,
        payments: [...action.payload.payments]
      };
    case Types.PRESENCE_DAY_BY_COLLABORATOR_LOADED:
      return {
        ...state,
        presenceDayByCollaborator: [...action.payload.pending_days],
        totalOvertimeByCollaborator: action.payload.total_overtime
      };
    case Types.REGISTER_PRESENCE_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case Types.CLEAN_PRESENCE_DAY_BY_COLLABORATOR:
      return {
        ...state,
        presenceDayByCollaborator: [],
        totalOvertimeByCollaborator: 0
      };

    default:
      return state;
  }
};

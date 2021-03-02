import { Types } from "../types/Types";

const initialState = {
  payments: [],
  count: 0,
};

export const PaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.PAYMENTS_LOADED:
      return {
        ...state,
        payments: [...action.payload.payments],
        count: action.payload.count,
      };
    default:
      return state;
  }
};

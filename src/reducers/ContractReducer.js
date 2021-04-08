import { Types } from "../types/Types";

const initialState = {
  contracts: [],
};

export const ContractReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.CONTRACTS_ACTIVES_LOADED:
      return {
        ...state,
        contracts: [...action.payload.contracts],
      };
    default:
      return state;
  }
};

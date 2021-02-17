import { Types } from "../types/Types";

const initialState = {
contracts: [],
count: 0,
};

export const ContractReducer = ( state = initialState, action ) => {
switch (action.type) {
    case Types.CONTRACT_LOADED:
        return{
            ...state,
            contracts: [...action.payload.contracts],
            count: action.payload.count,
        };
    default:
        return state;
}

}

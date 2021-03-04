import { Types } from "../types/Types";

const initialState = {
    tools: [],
    count: 0,
};

export const ToolReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.TOOLS_LOADED:
            return {
                ...state,
                tools: [...action.payload.tools],
                count: action.payload.count,
              };
              default:
                return state;
    }
};
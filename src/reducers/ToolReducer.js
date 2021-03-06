import { Types } from "../types/Types";

const initialState = {
  tools: [],
  actives: [],
  count: 0,
  toolsState: "",
};

export const ToolReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.TOOLS_LOADED:
      return {
        ...state,
        tools: [...action.payload.tools],
        count: action.payload.count,
        toolsState: action.payload.toolsState,
      };
    case Types.ACTIVES_LOADED:
      return {
        ...state,
        actives: [...action.payload.actives],
        countActive: action.payload.count,
      };
      case Types.ADD_NEW_TOOL:
        return {
          ...state,
        ...action.payload,
        }
    default:
      return state;
  }
};

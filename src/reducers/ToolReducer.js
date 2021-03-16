import { Types } from "../types/Types";

const initialState = {
  tools: [],
  actives: [],
  selectedTools: [],
  selectedActives: [],
  currentTool: null,
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
      };
    case Types.ADD_NEW_TOOL:
      return {
        ...state,
        ...action.payload,
      };

    case Types.ADD_TO_SELECT_TOOLS:
      return {
        ...state,
        selectedTools: [...state.selectedTools, action.payload],
      };

    case Types.REMOVE_IN_SELECT_TOOLS:
      return {
        ...state,
        selectedTools: state.selectedTools.filter(
          (e) => e.tool_id !== action.payload
        ),
      };

    case Types.ADD_TO_SELECT_ACTIVES:
      return {
        ...state,
        selectedActives: [...state.selectedActives, action.payload],
      };

    case Types.REMOVE_IN_SELECT_ACTIVES:
      return {
        ...state,
        selectedActives: state.selectedActives.filter(
          (e) => e.active_id !== action.payload
        ),
      };

    case Types.REMOVE_IN_ACTIVES:
      return {
        ...state,
        actives: state.actives.filter((e) => e._id !== action.payload),
      };

    case Types.CLEAN_SELECT_TOOLS:
      return {
        ...state,
        selectedTools: [],
      };

    case Types.CLEAN_SELECT_ACTIVES:
      return {
        ...state,
        selectedActives: [],
      };

    default:
      return state;
  }
};

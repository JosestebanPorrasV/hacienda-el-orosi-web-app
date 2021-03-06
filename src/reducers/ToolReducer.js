import { Types } from '../types/Types';

const initialState = {
  tools: [],
  actives: [],
  selectedTools: [],
  selectedActives: [],
  currentTool: null,
  toolsState: ''
};

export const ToolReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.TOOLS_LOADED:
      return {
        ...state,
        tools: [...action.payload.tools],
        toolsState: action.payload.toolsState
      };

    case Types.TOOL_SET_ACTIVE:
      return {
        ...state,
        currentTool: action.payload
      };

    case Types.TOOL_CLEAR_ACTIVE:
      return {
        ...state,
        currentTool: null
      };

    case Types.ACTIVES_LOADED:
      return {
        ...state,
        actives: [...action.payload.actives]
      };
    case Types.ADD_NEW_TOOL:
      return {
        tools: [...state.tools, action.payload]
      };

    case Types.ADD_TO_SELECT_TOOLS:
      return {
        ...state,
        selectedTools: [...state.selectedTools, action.payload]
      };

    case Types.REMOVE_IN_SELECT_TOOLS:
      return {
        ...state,
        selectedTools: state.selectedTools.filter((e) => e.tool_id !== action.payload)
      };

    case Types.ADD_TO_SELECT_ACTIVES:
      return {
        ...state,
        selectedActives: [...state.selectedActives, action.payload]
      };

    case Types.REMOVE_IN_SELECT_ACTIVES:
      return {
        ...state,
        selectedActives: state.selectedActives.filter((e) => e.active_id !== action.payload)
      };

    case Types.REMOVE_IN_ACTIVES:
      return {
        ...state,
        actives: state.actives.filter((e) => e._id !== action.payload)
      };

    case Types.CLEAN_SELECT_TOOLS:
      return {
        ...state,
        selectedTools: []
      };

    case Types.CLEAN_SELECT_ACTIVES:
      return {
        ...state,
        selectedActives: []
      };

    case Types.TOOL_CHANGE_STATUS:
      return {
        ...state,
        tools: state.tools.map((e) => (e._id === action.payload._id ? action.payload : e))
      };

    default:
      return state;
  }
};

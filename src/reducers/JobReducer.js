import { Types } from "../types/Types";

const initialState = {
  jobs: [],
  currentJob: null,
};

export const JobReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.JOB_LOADED:
      return {
        ...state,
        jobs: [...action.payload.jobs],
      };

    case Types.ADD_JOB:
      return {
        ...state,
        jobs: [...state.jobs, action.payload],
      };

    case Types.UPDATED_JOB:
      return {
        ...state,
        jobs: state.jobs.map((e) =>
          e._id === action.payload._id ? action.payload : e
        ),
      };

    case Types.DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter((e) => e._id !== action.payload._id),
      };

    case Types.JOB_SET_ACTIVE:
      return {
        ...state,
        currentJob: action.payload,
      };

    case Types.JOB_CLEAR_ACTIVE:
      return {
        ...state,
        currentJob: null,
      };

    default:
      return state;
  }
};

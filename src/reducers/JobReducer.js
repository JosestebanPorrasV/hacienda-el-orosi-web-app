import { Types } from "../types/Types";

const initialState = {
  jobs: [],
};

export const JobReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.JOB_LOADED:
      return {
        ...state,
        jobs: [...action.payload.jobs],
      };
      case Types.DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter((e) => e._id !== action.payload),
      };

    default:
      return state;
  }
};

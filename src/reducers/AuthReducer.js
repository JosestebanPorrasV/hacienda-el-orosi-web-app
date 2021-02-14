import { Types } from "../types/Types";

const initialState = {
  //name: 'Adrian', ...
  checking: true,
  recoveryState: 0,
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN:
      return {
        ...state,
        ...action.payload,
        checking: false,
      };

    case Types.CHECK_LOGIN_FINISH:
      return {
        ...state,
        checking: false,
      };

    case Types.LOGOUT:
      return {
        checking: false,
      };

    case Types.CHANGE_PASSWORD:
      return {
        recoveryState: 0,
        checking: false,
      };

    case Types.CHECK_RECOVERY_STATUS:
      return {
        ...state,
        ...action.payload,
        checking: false,
      };

    default:
      return state;
  }
};

import { combineReducers } from "redux";

import { AuthReducer } from "./AuthReducer";
import { CollaboratorReducer } from "./CollaboratorReducer";

export const rootReducer = combineReducers({
  auth: AuthReducer,
  collaborator: CollaboratorReducer
});

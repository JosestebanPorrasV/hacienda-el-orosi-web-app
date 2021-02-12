import { combineReducers } from "redux";

import { AuthReducer } from "./AuthReducer";
import { AdministratorReducer } from "./AdministratorReducer";
import { CollaboratorReducer } from "./CollaboratorReducer";

export const rootReducer = combineReducers({
  auth: AuthReducer,
  administrator: AdministratorReducer,
  collaborator: CollaboratorReducer
});

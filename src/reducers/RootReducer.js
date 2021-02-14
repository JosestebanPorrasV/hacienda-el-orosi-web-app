import { combineReducers } from "redux";

import { AuthReducer } from "./AuthReducer";
import { AdministratorReducer } from "./AdministratorReducer";
import { CollaboratorReducer } from "./CollaboratorReducer";
import { LendReducer } from "./LendReducer";

export const rootReducer = combineReducers({
  auth: AuthReducer,
  administrator: AdministratorReducer,
  collaborator: CollaboratorReducer,
  lend: LendReducer
});

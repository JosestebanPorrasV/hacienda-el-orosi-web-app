import { combineReducers } from "redux";

import { AuthReducer } from "./AuthReducer";
import { AdministratorReducer } from "./AdministratorReducer";
import { CollaboratorReducer } from "./CollaboratorReducer";
import { PaymentReducer } from "./PaymentReducer";
import { LendReducer } from "./LendReducer";
import { ContractReducer } from "./ContractReducer";

export const rootReducer = combineReducers({
  auth: AuthReducer,
  administrator: AdministratorReducer,
  collaborator: CollaboratorReducer,
  lend: LendReducer,
  payment: PaymentReducer,
  contract: ContractReducer,
});

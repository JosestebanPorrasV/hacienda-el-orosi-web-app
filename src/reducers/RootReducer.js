import { combineReducers } from "redux";

import { AuthReducer } from "./AuthReducer";
import { UIReducer } from "./UIReducer";
import { AdministratorReducer } from "./AdministratorReducer";
import { CollaboratorReducer } from "./CollaboratorReducer";
import { PaymentReducer } from "./PaymentReducer";
import { LendReducer } from "./LendReducer";
import { ContractReducer } from "./ContractReducer";
import { ToolReducer } from "./ToolReducer";
import { JobReducer } from "./JobReducer";

export const rootReducer = combineReducers({
  auth: AuthReducer,
  ui: UIReducer,
  administrator: AdministratorReducer,
  collaborator: CollaboratorReducer,
  lend: LendReducer,
  payment: PaymentReducer,
  contract: ContractReducer,
  tool: ToolReducer,
  job: JobReducer,
});

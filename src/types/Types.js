export const Types = {
  // LOGIN
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  CHECK_LOGIN_FINISH: 'CHECK_LOGIN_FINISH',
  CHECK_RECOVERY_STATUS: 'CHECK_RECOVERY_STATUS',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',

  //UI
  UI_OPEN_MENU: 'UI_OPEN_MENU',
  UI_CLOSE_MENU: 'UI_CLOSE_MENU',
  UI_OPEN_MODAL_ADMINISTRATOR: 'UI_OPEN_MODAL_ADMINISTRATOR',
  UI_CLOSE_MODAL_ADMINISTRATOR: 'UI_CLOSE_MODAL_ADMINISTRATOR',
  UI_OPEN_MODAL_COLLABORATOR: 'UI_OPEN_MODAL_COLLABORATOR',
  UI_CLOSE_MODAL_COLLABORATOR: 'UI_CLOSE_MODAL_COLLABORATOR',
  UI_OPEN_MODAL_JOBS: 'UI_OPEN_MODAL_JOBS',
  UI_CLOSE_MODAL_JOBS: 'UI_CLOSE_MODAL_JOBS',
  UI_OPEN_MODAL_FEES: 'UI_OPEN_MODAL_FEES',
  UI_CLOSE_MODAL_FEES: 'UI_CLOSE_MODAL_FEES',
  UI_OPEN_MODAL_ADD_LEND: 'UI_OPEN_MODAL_ADD_LEND',
  UI_CLOSE_MODAL_ADD_LEND: 'UI_CLOSE_MODAL_ADD_LEND',
  UI_OPEN_MODAL_ADD_TOOL: 'UI_OPEN_MODAL_ADD_TOOL',
  UI_CLOSE_MODAL_ADD_TOOL: 'UI_CLOSE_MODAL_ADD_TOOL',
  UI_OPEN_MODAL_ACTIVES: 'UI_OPEN_MODAL_ACTIVES',
  UI_CLOSE_MODAL_ACTIVES: 'UI_CLOSE_MODAL_ACTIVES',
  UI_OPEN_MODAL_ADD_ACTIVE: 'UI_OPEN_MODAL_ADD_ACTIVE',
  UI_CLOSE_MODAL_ADD_ACTIVE: 'UI_CLOSE_MODAL_ADD_ACTIVE',
  UI_OPEN_MODAL_PAYMENT: 'UI_OPEN_MODAL_PAYMENT',
  UI_CLOSE_MODAL_PAYMENT: 'UI_CLOSE_MODAL_PAYMENT',
  UI_OPEN_MODAL_ANIMAL: 'UI_OPEN_MODAL_ANIMAL',
  UI_CLOSE_MODAL_ANIMAL: 'UI_CLOSE_MODAL_ANIMAL',
  UI_OPEN_MODAL_DIET: 'UI_OPEN_MODAL_DIET',
  UI_CLOSE_MODAL_DIET: 'UI_CLOSE_MODAL_DIET',
  UI_OPEN_MODAL_PRODUCT: 'UI_OPEN_MODAL_PRODUCT',
  UI_CLOSE_MODAL_PRODUCT: 'UI_CLOSE_MODAL_PRODUCT',

  //ADMINISTRATOR
  ADMINISTRATORS_LOADED: 'ADMINISTRATORS_LOADED',
  ADD_NEW_ADMINISTRATOR: 'ADD_NEW_ADMINISTRATOR',
  DELETE_ADMINISTRATOR: 'DELETE_ADMINISTRATOR',
  ADMINISTRATOR_SET_ACTIVE: 'ADMINISTRATOR_SET_ACTIVE',
  ADMINISTRATOR_CLEAR_ACTIVE: 'ADMINISTRATOR_CLEAR_ACTIVE',

  //COLLABORATOR
  COLLABORATORS_LOADED: 'COLLABORATORS_LOADED',
  COLLABORATOR_COUNT: 'COLLABORATOR_COUNT',
  ADD_NEW_COLLABORATOR: 'ADD_NEW_COLLABORATOR',
  COLLABORATOR_SET_ACTIVE: 'COLLABORATOR_SET_ACTIVE',
  COLLABORATOR_CLEAR_ACTIVE: 'COLLABORATOR_CLEAR_ACTIVE',
  UI_OPEN_MODAL_COLLABORATOR_INFO: 'UI_OPEN_MODAL_COLLABORATOR_INFO',
  UI_CLOSE_MODAL_COLLABORATOR_INFO: 'UI_CLOSE_MODAL_COLLABORATOR_INFO',
  VALIDATE_PRESENCE_COLLABORATOR: 'VALIDATE_PRESENCE_COLLABORATOR',
  LIQUIDATE_SET_ACTIVE: 'LIQUIDATE_SET_ACTIVE',
  LIQUIDATE_CLEAR_ACTIVE: 'LIQUIDATE_CLEAR_ACTIVE',

  //ANIMALES
  TYPES_LOADED: 'TYPES_LOADED',
  ANIMALS_LOADED: 'ANIMALS_LOADED',
  REGISTER_TYPE_ANIMAL_SUCCESS: 'REGISTER_TYPE_ANIMAL_SUCCESS',
  TYPE_SET_ACTIVE: 'TYPE_SET_ACTIVE',
  SEARCH_SET_ACTIVE: 'SEARCH_SET_ACTIVE',
  SEARCH_CLEAN_ACTIVE: 'SEARCH_CLEAN_ACTIVE',
  TYPE_CLEAR_ACTIVE: 'TYPE_CLEAR_ACTIVE',
  DELETE_TYPE: 'DELETE_TYPE',
  ADD_NEW_ANIMAL: 'ADD_NEW_ANIMAL',
  UPDATE_ANIMAL: 'UPDATE_ANIMAL',
  ANIMAL_SET_ACTIVE: 'ANIMAL_SET_ACTIVE',
  ANIMAL_CLEAR_ACTIVE: 'ANIMAL_CLEAR_ACTIVE',
  REGISTER_MILK_SUCCESS: 'REGISTER_MILK_SUCCESS',
  REGISTER_WEIGHT_SUCCESS: 'REGISTER_WEIGHT_SUCCESS',
  REGISTER_CALVING_SUCCESS: 'REGISTER_CALVING_SUCCESS',
  ANIMAL_CHANGE_STATUS: 'ANIMAL_CHANGE_STATUS',
  ANIMAL_CHANGE__NEXT_DUE_DATE: 'ANIMAL_CHANGE__NEXT_DUE_DATE',
  ANIMAL_REMOVE__WEIGHT: 'ANIMAL_REMOVE__WEIGHT',
  ANIMAL_REMOVE__MILK: 'ANIMAL_REMOVE__MILK',
  ANIMAL_REMOVE__CALVING: 'ANIMAL_REMOVE__CALVING',

  //DIET AND ALIMENT
  DIETS_LOADED: 'DIETS_LOADED',
  ADD_NEW_DIET: 'ADD_NEW_DIET',
  DIET_SET_ACTIVE: 'DIET_SET_ACTIVE',
  DIET_CLEAR_ACTIVE: 'DIET_CLEAR_ACTIVE',
  ALIMENTS_LOADED: 'ALIMENTS_LOADED',
  ADD_NEW_ALIMENT: 'ADD_NEW_ALIMENT',
  ALIMENT_SET_ACTIVE: 'ALIMENT_SET_ACTIVE',
  ALIMENT_CLEAR_ACTIVE: 'ALIMENT_CLEAR_ACTIVE',

  //PRODUCT
  PRODUCTS_LOADED: 'PRODUCTS_LOADED',
  ADD_NEW_PRODUCT: 'ADD_NEW_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  PRODUCT_SET_ACTIVE: 'PRODUCT_SET_ACTIVE',
  PRODUCT_CLEAR_ACTIVE: 'PRODUCT_CLEAR_ACTIVE',

  //TRABAJOS
  JOB_LOADED: 'JOB_LOADED',
  ADD_JOB: 'ADD_JOB',
  UPDATED_JOB: 'UPDATED_JOB',
  DELETE_JOB: 'DELETE_JOB',
  JOB_SET_ACTIVE: 'JOB_SET_ACTIVE',
  JOB_CLEAR_ACTIVE: 'JOB_CLEAR_ACTIVE',

  //PAGOS
  PAYMENTS_LOADED: 'PAYMENTS_LOADED',
  REGISTER_PRESENCE_SUCCESS: 'REGISTER_PRESENCE_SUCCESS',
  CLEAN_PRESENCE_DAY_BY_COLLABORATOR: 'CLEAN_PRESENCE_DAY_BY_COLLABORATOR',

  //PRESTAMOS
  LENDS_LOADED: 'LENDS_LOADED',
  LENDS_LOADED_BY_COLLABORATOR: 'LENDS_LOADED_BY_COLLABORATOR',
  ADD_NEW_LEND: 'ADD_NEW_LEND',
  LEND_SET_ACTIVE: 'LEND_SET_ACTIVE',
  LEND_CLEAR_ACTIVE: 'LEND_CLEAR_ACTIVE',
  LEND_CHANGE_FEE: 'LEND_CHANGE_FEE',
  PRESENCE_DAY_BY_COLLABORATOR_LOADED: 'PRESENCE_DAY_BY_COLLABORATOR_LOADED',

  //CUOTAS
  FEES_LOADED: 'FEES_LOADED',
  FEE_LOADED_CLEAR: 'FEE_LOADED_CLEAR',
  ADD_NEW_FEE: 'ADD_NEW_FEE',
  ADD_FEE_SUCCESS: 'ADD_FEE_SUCCESS',
  ADD_FEE_ERROR: 'ADD_FEE_ERROR',

  //CONTRATOS
  CONTRACTS_ACTIVES_LOADED: 'CONTRACTS_ACTIVES_LOADED',

  //HERRAMIENTAS
  TOOLS_LOADED: 'TOOLS_LOADED',
  ADD_NEW_TOOL: 'ADD_NEW_TOOL',
  TOOL_SET_ACTIVE: 'TOOL_SET_ACTIVE',
  TOOL_CLEAR_ACTIVE: 'TOOL_CLEAR_ACTIVE',
  ADD_TO_SELECT_TOOLS: 'ADD_TO_SELECT_TOOLS',
  REMOVE_IN_SELECT_TOOLS: 'REMOVE_IN_SELECT_TOOLS',
  CLEAN_SELECT_TOOLS: 'CLEAN_SELECT_TOOLS',
  TOOL_CHANGE_STATUS: 'TOOL_CHANGE_STATUS',

  //ACTIVOS
  ACTIVES_LOADED: 'ACTIVES_LOADED',
  REMOVE_IN_ACTIVES: 'REMOVE_IN_ACTIVES',
  ADD_TO_SELECT_ACTIVES: 'ADD_TO_SELECT_ACTIVES',
  REMOVE_IN_SELECT_ACTIVES: 'REMOVE_IN_SELECT_ACTIVES',
  CLEAN_SELECT_ACTIVES: 'CLEAN_SELECT_ACTIVES'
};

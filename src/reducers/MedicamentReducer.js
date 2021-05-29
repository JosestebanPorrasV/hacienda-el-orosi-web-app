import { Types } from '../types/Types';

const initialState = {
  medicaments: [],
  currentMedicament: null
};

export const MedicamentReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.MEDICAMENTS_LOADED:
      return {
        ...state,
        medicaments: [...action.payload.medicaments]
      };

    case Types.ADD_MEDICAMENT:
      return {
        ...state,
        medicaments: [...state.medicaments, action.payload.medicament]
      };

    case Types.UPDATED_MEDICAMENT:
      return {
        ...state,
        medicaments: state.medicaments.map((e) =>
          e._id === action.payload._id ? action.payload : e
        )
      };

    case Types.DELETE_MEDICAMENT:
      return {
        ...state,
        medicaments: state.medicaments.filter((e) => e._id !== state.currentMedicament._id),
        currentMedicament: null
      };

    case Types.MEDICAMENT_SET_ACTIVE:
      return {
        ...state,
        currentMedicament: action.payload
      };

    case Types.MEDICAMENT_CLEAR_ACTIVE:
      return {
        ...state,
        currentMedicament: null
      };

    default:
      return state;
  }
};

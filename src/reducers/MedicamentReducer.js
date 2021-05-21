import { Types } from '../types/Types';

const initialState = {
    medicaments: [],
  currentMedicament: null
};

export const MedicamentReducer = (state = initialState, action) => {
  switch (action.type) {

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

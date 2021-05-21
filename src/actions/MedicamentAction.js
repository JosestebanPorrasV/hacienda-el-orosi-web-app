import { Types } from '../types/Types';
import { FetchConsult } from '../helpers/FetchService';
import Swal from 'sweetalert2';
import TopLoaderService from 'top-loader-service';

export const searchMedicament = (medicamentName) => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(`gestion-salud/ver-medicamento/${medicamentName}`);
      const body = await resp.json();
      if (body.status) {
        await dispatch(medicamentSetActive(body.medicament));

        await Swal.fire({
          icon: 'success',
          title: body.msg,
          showConfirmButton: false,
          timer: 2000
        });

        await TopLoaderService.end();
      } else {
        await Swal.fire('Error', body.msg, 'warning');
        await TopLoaderService.end();
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const medicamentSetActive = (medicament) => ({
  type: Types.MEDICAMENT_SET_ACTIVE,
  payload: medicament
});
export const medicamentClearActive = () => ({
  type: Types.MEDICAMENT_CLEAR_ACTIVE
});

const medicamentsLoaded = (medicaments) => ({
  type: Types.PRODUCTS_LOADED,
  payload: medicaments
});

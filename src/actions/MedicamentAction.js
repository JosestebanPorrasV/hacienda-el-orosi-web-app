import { Types } from '../types/Types';
import { FetchConsult } from '../helpers/FetchService';
import Swal from 'sweetalert2';
import TopLoaderService from 'top-loader-service';

export const MedicamentsLoaded = () => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(`gestion-salud//listar-medicamentos`);
      const body = await resp.json();

      if (body.status) {
        await dispatch(medicamentsLoaded(body));

        await TopLoaderService.end();
      } else {
        await Swal.fire("Error", body.msg, "error");

        await TopLoaderService.end();
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export function saveMedicament(medicamentFormValues) {
  return async (dispatch) => {
    await TopLoaderService.start();
    const resp = await FetchConsult(
      "gestion-salud/guardar-medicamento",
      {
        name: medicamentFormValues.name,
        quantity: medicamentFormValues.quantity,
        milliliters: medicamentFormValues.milliliters,
        unit_price: medicamentFormValues.unit_price,
      },
      "POST"
    );

    const body = await resp.json();
    if (body.status) {
      await dispatch(addMedicamentSuccess(body));
      await Swal.fire({
        icon: "success",
        title: body.msg,
        showConfirmButton: false,
        timer: 2000,
      });

      await TopLoaderService.end();
    } else {
      await Swal.fire("Error", body.msg, "error");
      await TopLoaderService.end();
    }
  };
}

export const searchMedicament = (active_num) => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(`gestion-salud/ver-medicamento/${active_num}`);
      const body = await resp.json();
      if (body.status) {
        console.log(body);
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

export const medicamentDelete = ({ _id }) => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(
        `gestion-salud/remover-medicamento/${_id}`,
        { },
        "DELETE"
      );

      const body = await resp.json();
      if (body.status) {
        await Swal.fire("Eliminado", body.msg, "success");

        await dispatch(deleteOneMedicament());

        await TopLoaderService.end();
      } else {
        await Swal.fire("Error", body.msg, "error");
        await TopLoaderService.end();
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteOneMedicament = () => ({
  type: Types.DELETE_MEDICAMENT,
});

export const medicamentSetActive = (medicament) => ({
  type: Types.MEDICAMENT_SET_ACTIVE,
  payload: medicament
});
export const medicamentClearActive = () => ({
  type: Types.MEDICAMENT_CLEAR_ACTIVE
});

export const addMedicamentSuccess = (medicament) => ({
  type: Types.ADD_MEDICAMENT,
  payload: medicament,
});

const medicamentsLoaded = (medicaments) => ({
  type: Types.MEDICAMENTS_LOADED,
  payload: medicaments
});

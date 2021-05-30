import { Types } from '../types/Types';
import { FetchConsult } from '../helpers/FetchService';
import Swal from 'sweetalert2';
import TopLoaderService from 'top-loader-service';
import { animalClearActive } from './AnimalAction';
import { uiCloseModalHealth } from './UIAction';

export const HealthsLoaded = () => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(`gestion-salud/listar-registros-medico`);
      const body = await resp.json();

      if (body.status) {
        await dispatch(healthsLoaded(body));

        await TopLoaderService.end();
      } else {
        await Swal.fire('Error', body.msg, 'error');

        await TopLoaderService.end();
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export function registerHealth(
  animalId,
  healthFormValues,
  medicamentID,
  administrator_date,
  consumed_date
) {
  return async (dispatch) => {
    await TopLoaderService.start();
    const resp = await FetchConsult(
      `gestion-salud/registro-medico/${animalId}`,
      {
        medicamentID: medicamentID,
        dose: healthFormValues.dose,
        administrator_date: administrator_date,
        human_consumed_date: consumed_date
      },
      'POST'
    );

    const body = await resp.json();
    if (body.status) {
      await dispatch(addHealthSuccess(body));
      await dispatch(animalClearActive());
      await dispatch(healthClearActive());
      await dispatch(uiCloseModalHealth());
      await Swal.fire({
        icon: 'success',
        title: body.msg,
        showConfirmButton: false,
        timer: 2000
      });

      await TopLoaderService.end();
    } else {
      await Swal.fire('Error', body.msg, 'error');
      await TopLoaderService.end();
    }
  };
}

export function editOneJob(job_id, job) {
  return async (dispatch) => {
    await TopLoaderService.start();
    const resp = await FetchConsult(
      `recursos-humanos/actualizar-trabajo/${job_id}`,
      {
        name: job.name,
        description: job.description,
        work_hours: job.work_hours,
        price_extra_hours: job.price_extra_hours,
        price_day: job.price_day
      },
      'PUT'
    );
    const body = await resp.json();
    if (body.status) {
      await Swal.fire({
        icon: 'success',
        title: body.msg,
        showConfirmButton: false,
        timer: 2000
      });

      await TopLoaderService.end();
    } else {
      await Swal.fire('Error', body.msg, 'error');
      await TopLoaderService.end();
    }
  };
}

export const healthDelete = ({ _id }) => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(
        `gestion-salud/remover-registro-medico/${_id}`,
        { },
        "DELETE"
      );

      const body = await resp.json();
      if (body.status) {
        await Swal.fire("Eliminado", body.msg, "success");

        await dispatch(deleteOneHealth());
        await dispatch(HealthsLoaded());

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

export const deleteOneHealth = () => ({
  type: Types.DELETE_HEALTH,
});

export const healthSetActive = (health) => ({
  type: Types.HEALTH_SET_ACTIVE,
  payload: health
});
export const healthClearActive = () => ({
  type: Types.HEALTH_CLEAR_ACTIVE
});

export const addHealthSuccess = (health) => ({
  type: Types.ADD_HEALTH,
  payload: health
});

export const updateHealthSuccess = (health) => ({
  type: Types.UPDATED_HEALTH,
  payload: health
});

const healthsLoaded = (healths) => ({
  type: Types.HEALTHS_LOADED,
  payload: healths
});

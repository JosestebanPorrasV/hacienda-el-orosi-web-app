import { Types } from '../types/Types';
import { FetchConsult } from '../helpers/FetchService';
import Swal from 'sweetalert2';
import TopLoaderService from 'top-loader-service';
import { uiCloseModalJob } from './UIAction';

export const JobsLoaded = () => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(`recursos-humanos/ver-trabajos`);
      const body = await resp.json();

      if (body.status) {
        await dispatch(jobsLoaded(body));

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

export function registerJob(jobFormValues) {
  return async (dispatch) => {
    await TopLoaderService.start();
    const resp = await FetchConsult(
      'recursos-humanos/registrar-trabajo',
      {
        name: jobFormValues.name,
        description: jobFormValues.description,
        work_hours: jobFormValues.work_hours,
        price_extra_hours: jobFormValues.price_extra_hours,
        price_day: jobFormValues.price_day
      },
      'POST'
    );

    const body = await resp.json();
    if (body.status) {
      await dispatch(addJobSuccess(body.job));
      await Swal.fire({
        icon: 'success',
        title: body.msg,
        showConfirmButton: false,
        timer: 2000
      });
      await dispatch(uiCloseModalJob());
      await dispatch(jobClearActive());
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
      await dispatch(updateJobSuccess(body.job));
      await dispatch(jobClearActive());
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

export const oneJobDelete = (job) => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(
        `recursos-humanos/remover-trabajo/${job._id}`,
        { _id: job._id },
        'DELETE'
      );

      const body = await resp.json();
      if (body.status) {
        await Swal.fire('Eliminado', body.msg, 'success');

        await dispatch(deleteOneJob(body.job));

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

export const deleteOneJob = (job) => ({
  type: Types.DELETE_JOB,
  payload: job
});

export const jobSetActive = (job) => ({
  type: Types.JOB_SET_ACTIVE,
  payload: job
});
export const jobClearActive = () => ({
  type: Types.JOB_CLEAR_ACTIVE
});

export const addJobSuccess = (job) => ({
  type: Types.ADD_JOB,
  payload: job
});

export const updateJobSuccess = (job) => ({
  type: Types.UPDATED_JOB,
  payload: job
});

const jobsLoaded = (jobs) => ({
  type: Types.JOB_LOADED,
  payload: jobs
});

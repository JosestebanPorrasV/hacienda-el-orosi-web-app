import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";
import Swal from "sweetalert2";

export const JobsLoaded = () => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(`recursos-humanos/ver-trabajos`);
      const body = await resp.json();

      if (body.status) {
        await dispatch(jobsLoaded(body));
      } else {
        await Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export function registerJob(jobFormValues) {
  return async (dispatch) => {
    const resp = await FetchConsult(
      "recursos-humanos/registrar-trabajo",
      {
        name_job: jobFormValues.name_job,
        description: jobFormValues.description,
        work_hours: jobFormValues.work_hours,
        price_extra_hours: jobFormValues.price_extra_hours,
        price_day: jobFormValues.price_day,
      },
      "POST"
    );

    const body = await resp.json();
    if (body.status) {
      await dispatch(addJobSuccess());
      await dispatch(JobsLoaded());
      await Swal.fire({
        icon: "success",
        title: body.msg,
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      await Swal.fire("Error", body.msg, "error");
    }
  };
}

export function editOneJob(job_id, job) {
  return async (dispatch) => {
    const resp = await FetchConsult(
      `recursos-humanos/actualizar-trabajo/${job_id}`,
      {
        name_job: job.name_job,
        description: job.description,
        work_hours: job.work_hours,
        price_extra_hours: job.price_extra_hours,
        price_day: job.price_day,
      },
      "PUT"
    );
    const body = await resp.json();
    if (body.status) {
      await dispatch(JobsLoaded());
      await dispatch(jobClearActive());
      await Swal.fire({
        icon: "success",
        title: body.msg,
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
}

export const oneJobDelete = (jobId) => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(
        `recursos-humanos/remover-trabajo/${jobId}`,
        { _id: jobId },
        "DELETE"
      );

      const body = await resp.json();
      if (body.status) {
        await Swal.fire("Eliminado", body.msg, "success");

        await dispatch(deleteOneJob(jobId));
      } else {
        await Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteOneJob = (jobId) => ({
  type: Types.DELETE_JOB,
  payload: jobId,
});

export const jobSetActive = (job) => ({
  type: Types.JOB_SET_ACTIVE,
  payload: job,
});
export const jobClearActive = () => ({
  type: Types.JOB_CLEAR_ACTIVE,
});

export const addJobSuccess = () => ({
  type: Types.ADD_JOB,
});

const jobsLoaded = (jobs) => ({
  type: Types.JOB_LOADED,
  payload: jobs,
});

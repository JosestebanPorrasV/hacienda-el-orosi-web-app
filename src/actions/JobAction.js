import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";
import Swal from "sweetalert2";

export const JobsLoaded = () => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(
        `recursos-humanos/ver-trabajos`
      );
      const body = await resp.json();

      if (body.status === "success") {
        await dispatch(jobsLoaded(body));
      } else {
        await Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const jobsLoaded = (jobs) => ({
  type: Types.JOB_LOADED,
  payload: jobs,
});

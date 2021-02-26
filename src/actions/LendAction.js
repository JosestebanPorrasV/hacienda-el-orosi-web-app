import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";
import Swal from "sweetalert2";

export const lendsStartLoading = (status="active", page) => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(`recursos-humanos/prestamos/${status}/${page}`);

      const body = await resp.json();
      if (body.status === "success") {
        dispatch(lendsLoaded(body.lends));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const FeesStartLoading = (id) => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(
        `recursos-humanos/historial-cuotas/${id}`
      );

      const body = await resp.json();

      if (body.status === "success") {
        dispatch(feesLoaded(body.fees));
      } else {
      }
    } catch (error) {}
  };
};

const lendsLoaded = (lends) => ({
  type: Types.LENDS_LOADED,
  payload: lends,
});

const feesLoaded = (fees) => ({
  type: Types.FEES_LOADED,
  payload: fees,
});

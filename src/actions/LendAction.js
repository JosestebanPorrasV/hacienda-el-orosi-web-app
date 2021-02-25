import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";
import Swal from "sweetalert2";

export const lendStartLoading = (status, page) => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(`recursos-humanos/prestamos/${status}/${page}`);

      const body = await resp.json();
      console.log(body);
      if (body.status === "success") {
        dispatch(lendLoaded(body));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const lendCancelLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(`recursos-humanos/historial`);

      const body = await resp.json();

      if (body.status === "success") {
        dispatch(lendLoaded(body.lends));
      } else {
      }
    } catch (error) {}
  };
};

export const FeeStartLoading = (id_) => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(
        `recursos-humanos/historial-cuotas/${id_}`
      );

      const body = await resp.json();

      if (body.status === "success") {
        dispatch(feeLoaded(body.fees));
      } else {
      }
    } catch (error) {}
  };
};

const lendLoaded = (lends) => ({
  type: Types.LEND_LOADED,
  payload: lends,
});

const feeLoaded = (fees) => ({
  type: Types.FEE_LOADED,
  payload: fees,
});

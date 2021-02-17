import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";
import Swal from "sweetalert2";

export const paymentStartLoading = (page_) => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(
        `recursos-humanos/pagos/realizados/${page_}`
      );

      const body = await resp.json();

      if (body.status === "success") {
        dispatch(paymentLoaded(body.payments));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const paymentLoaded = (payments) => ({
  type: Types.PAYMENT_LOADED,
  payload: payments,
});

import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";
import Swal from "sweetalert2";
import TopLoaderService from "top-loader-service";

export const paymentStartLoading = (page_) => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(
        `recursos-humanos/pagos/realizados/${page_}`
      );

      const body = await resp.json();

      if (body.status === "success") {
        await dispatch(paymentLoaded(body.payments));
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

const paymentLoaded = (payments) => ({
  type: Types.PAYMENT_LOADED,
  payload: payments,
});

import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";

export const paymentStartLoading = (page_) => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(`recursos-humanos/pagos/realizados/${page_}`);

      const body = await resp.json();

      if (body.status === "success") {
        console.log(body.payments);
        dispatch(paymentLoaded(body.payments));
      } else {
        console.log("Error", body.msg, "error");
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

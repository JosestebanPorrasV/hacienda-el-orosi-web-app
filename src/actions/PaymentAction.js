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

export function registerTodayPresence(collaborator_id, total_overtime = 0 ) {
  return async (dispatch) => {
    await TopLoaderService.start();
    const resp = await FetchConsult(
      `recursos-humanos/registrar/dia-laboral/${collaborator_id}`,
      { total_overtime: total_overtime },
      "POST"
    );

    const body = await resp.json();

    if (body.status === "success") {
      await dispatch(registerPresence());

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

const registerPresence = () => ({
  type: Types.REGISTER_PRESENCE_SUCCESS,
});

const paymentLoaded = (payments) => ({
  type: Types.PAYMENT_LOADED,
  payload: payments,
});

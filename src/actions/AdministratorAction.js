import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";
import Swal from "sweetalert2";

export const AdministratorsLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult("/administradores");
      const body = await resp.json();
      if (body.status === "success") {
        dispatch(administratorsLoaded(body));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const administratorsLoaded = (administrators) => ({
  type: Types.ADMINISTRATORS_LOADED,
  payload: administrators,
});

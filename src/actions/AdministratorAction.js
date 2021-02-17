import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";
import Swal from "sweetalert2";

export const AdministratorLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult("/administradores");
      const body = await resp.json();
      if (body.status === "success") {
        dispatch(administratorLoaded(body));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const administratorLoaded = (administrators) => ({
  type: Types.ADMINISTRATOR_LOADED,
  payload: administrators,
});

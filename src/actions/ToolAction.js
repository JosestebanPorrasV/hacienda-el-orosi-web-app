import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";
import Swal from "sweetalert2";

export const tooltStartLoading = (page_) => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(`herramientas/registradas/${page_}`);
      const body = await resp.json();

      if (body.status === "success") {
        dispatch(toolLoaded(body.tools));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const toolLoaded = (tools) => ({
    type: Types.TOOLS_LOADED,
    payload: tools,
})

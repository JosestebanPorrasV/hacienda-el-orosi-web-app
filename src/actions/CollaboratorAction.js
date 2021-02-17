import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";
import Swal from "sweetalert2";

export const CollaboratorLoading = (page_) => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(
        `recursos-humanos/colaboradores-activos/${page_}`
      );
      const body = await resp.json();

      if (body.status === "success") {
        dispatch(collaboratorsLoaded(body.collaborators));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const collaboratorsLoaded = (collaborators) => ({
  type: Types.COLLABORATOR_LOADED,
  payload: collaborators,
});

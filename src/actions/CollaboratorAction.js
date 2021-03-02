import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";
import Swal from "sweetalert2";

export const CollaboratorsLoading = (page) => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(
        `recursos-humanos/colaboradores-activos/${page}`
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

export const searchCollaborator = (document_id) => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(
        `recursos-humanos/ver-colaborador/${document_id}`
      );
      const body = await resp.json();
      if (body.status === "success") {
        await dispatch(collaboratorSetActive(body.collaborator));
      } else {
        Swal.fire("Error", body.msg, "warning");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const collaboratorSetActive = (collaborator) => ({
  type: Types.COLLABORATOR_SET_ACTIVE,
  payload: collaborator,
});
export const collaboratorClearActive = () => ({
  type: Types.COLLABORATOR_CLEAR_ACTIVE,
});

const collaboratorsLoaded = (collaborators) => ({
  type: Types.COLLABORATORS_LOADED,
  payload: collaborators,
});

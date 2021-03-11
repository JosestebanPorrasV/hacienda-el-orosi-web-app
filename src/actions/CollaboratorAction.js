import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";
import Swal from "sweetalert2";

export const CollaboratorsLoading = (status = "active", page) => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(
        `recursos-humanos/colaboradores/${status}/${page}`
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

export function registerCollaborator(collaboratorFormValues) {
  return async (dispatch) => {
    const resp = await FetchConsult(
      "recursos-humanos/registrar-colaborador",
      {
        document_id: collaboratorFormValues.document_id,
        nationality: collaboratorFormValues.nationality,
        name: collaboratorFormValues.name,
        surname: collaboratorFormValues.surname,
        direction: collaboratorFormValues.direction,
        tel: collaboratorFormValues.tel,
        cel: collaboratorFormValues.cel,
      },
      "POST"
    );

    const body = await resp.json();
    if (body.status === "success") {
      await dispatch(addCollaboratorSuccess());
      await dispatch(CollaboratorsLoading());
      await dispatch(collaboratorClearActive());
      await Swal.fire({
        icon: "success",
        title: body.msg,
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};
export function editOneCollaborator(collaborator_id, collaborator) {
  return async (dispatch) => {
   
      const resp = await FetchConsult(
        `recursos-humanos/actualizar-colaborador/${collaborator_id}`,
        { document_id: collaborator.document_id,
          nationality: collaborator.nationality,
          name: collaborator.name,
          surname: collaborator.surname,
          direction: collaborator.direction,
          tel: collaborator.tel,
          cel: collaborator.cel, },
        "PUT"
      );
      const body = await resp.json();
      if (body.status === "success") {
        await dispatch(CollaboratorsLoading());
        await dispatch(collaboratorClearActive());
        await Swal.fire({
          icon: "success",
          title: body.msg,
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    }
  };


export const collaboratorSetActive = (collaborator) => ({
  type: Types.COLLABORATOR_SET_ACTIVE,
  payload: collaborator,
});
export const collaboratorClearActive = () => ({
  type: Types.COLLABORATOR_CLEAR_ACTIVE,
});
export const addCollaboratorSuccess = () => ({
  type: Types.ADD_NEW_COLLABORATOR,
});

const collaboratorsLoaded = (collaborators) => ({
  type: Types.COLLABORATORS_LOADED,
  payload: collaborators,
});

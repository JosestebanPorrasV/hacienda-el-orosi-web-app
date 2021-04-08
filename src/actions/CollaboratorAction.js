import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";
import Swal from "sweetalert2";
import TopLoaderService from "top-loader-service";

export const CollaboratorsLoading = (status = "Activo") => {
  return async (dispatch) => {
    await TopLoaderService.start();

    try {
      const resp = await FetchConsult(
        `recursos-humanos/colaboradores/${status}`
      );
      const body = await resp.json();

      if (body.status) {
        await dispatch(collaboratorsLoaded(body.collaborators));
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

export const searchCollaborator = (document_id) => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(
        `recursos-humanos/ver-colaborador/${document_id}`
      );
      const body = await resp.json();
      if (body.status) {
        await dispatch(collaboratorSetActive(body.collaborator));
        await TopLoaderService.end();
      } else {
        await Swal.fire("Error", body.msg, "warning");
        await TopLoaderService.end();
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export function registerCollaborator(
  collaboratorFormValues,
  date_admission,
  dispatch_date
) {
  return async (dispatch) => {
    await TopLoaderService.start();
    const resp = await FetchConsult(
      "recursos-humanos/registrar-colaborador",
      {
        document_id: collaboratorFormValues.document_id,
        job: collaboratorFormValues.job,
        nationality: collaboratorFormValues.nationality,
        name: collaboratorFormValues.name,
        surname: collaboratorFormValues.surname,
        direction: collaboratorFormValues.direction,
        tel: collaboratorFormValues.tel,
        cel: collaboratorFormValues.cel,
        date_admission: date_admission,
        dispatch_date: dispatch_date,
      },
      "POST"
    );

    const body = await resp.json();
    if (body.status) {
      await dispatch(addCollaboratorSuccess(body.collaborator));
      await dispatch(collaboratorSetActive(body.collaborator));
      await Swal.fire({
        icon: "success",
        title: body.msg,
        showConfirmButton: false,
        timer: 2000,
      });
      await TopLoaderService.end();
    } else {
      Swal.fire("Error", body.msg, "error");
      await TopLoaderService.end();
    }
  };
}
export function editOneCollaborator(
  collaborator_id,
  job_id,
  collaboratorFormValues,
  date_admission,
  dispatch_date
) {
  console.log(date_admission, dispatch_date);
  return async (dispatch) => {
    await TopLoaderService.start();
    const resp = await FetchConsult(
      `recursos-humanos/actualizar-colaborador/${collaborator_id}`,
      {
        document_id: collaboratorFormValues.document_id,
        nationality: collaboratorFormValues.nationality,
        job: job_id,
        name: collaboratorFormValues.name,
        surname: collaboratorFormValues.surname,
        direction: collaboratorFormValues.direction,
        tel: collaboratorFormValues.tel,
        cel: collaboratorFormValues.cel,
        date_admission: date_admission,
        dispatch_date: dispatch_date,
      },
      "PUT"
    );
    const body = await resp.json();
    if (body.status) {
      await dispatch(CollaboratorsLoading());
      await dispatch(collaboratorClearActive());
      await Swal.fire({
        icon: "success",
        title: body.msg,
        showConfirmButton: false,
        timer: 2000,
      });
      await TopLoaderService.end();
    } else {
      Swal.fire("Error", body.msg, "error");
      await TopLoaderService.end();
    }
  };
}

export const collaboratorSetActive = (collaborator) => ({
  type: Types.COLLABORATOR_SET_ACTIVE,
  payload: collaborator,
});
export const collaboratorClearActive = () => ({
  type: Types.COLLABORATOR_CLEAR_ACTIVE,
});

export const liquidateSetActive = () => ({
  type: Types.LIQUIDATE_SET_ACTIVE,
});
export const liquidateCleanActive = () => ({
  type: Types.LIQUIDATE_CLEAR_ACTIVE,
});
export const addCollaboratorSuccess = (collaborator) => ({
  type: Types.ADD_NEW_COLLABORATOR,
  payload: collaborator,
});

const collaboratorsLoaded = (collaborators) => ({
  type: Types.COLLABORATORS_LOADED,
  payload: collaborators,
});

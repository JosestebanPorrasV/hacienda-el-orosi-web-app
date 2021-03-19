import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";
import Swal from "sweetalert2";
import TopLoaderService from "top-loader-service";

export const AdministratorsLoading = () => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult("/administradores");
      const body = await resp.json();
      if (body.status === "success") {
        await dispatch(administratorsLoaded(body));
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

export function registerAdministrator(administratorFormValues) {
  return async (dispatch) => {
    await TopLoaderService.start();
    const resp = await FetchConsult(
      "/registrar-administrador",
      {
        document_id: administratorFormValues.document_id,
        password: administratorFormValues.password,
        email: administratorFormValues.email,
        name: administratorFormValues.name,
        surname: administratorFormValues.surname,
        role: administratorFormValues.role,
      },
      "POST"
    );

    const body = await resp.json();
    if (body.status === "success") {
      await dispatch(addAdministratorSuccess());
      await dispatch(AdministratorsLoading());
      await dispatch(administratorClearActive());
      await TopLoaderService.end();
      await Swal.fire({
        icon: "success",
        title: body.msg,
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      await Swal.fire("Error", body.msg, "error");
      await TopLoaderService.end();
    }
  };
}

export function changeRole(user_id, role) {
  return async (dispatch) => {
    await TopLoaderService.start();
    const resp = await FetchConsult(`/cambiar-rol/${user_id}`, { role }, "PUT");
    const body = await resp.json();
    if (body.status === "success") {
      await dispatch(AdministratorsLoading());
      await dispatch(administratorClearActive());
      await TopLoaderService.end();
      await Swal.fire({
        icon: "success",
        title: body.msg,
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      await Swal.fire("Error", body.msg, "error");
      await TopLoaderService.end();
    }
  };
}

export const administratorSetActive = (administrator) => ({
  type: Types.ADMINISTRATOR_SET_ACTIVE,
  payload: administrator,
});

export const administratorClearActive = () => ({
  type: Types.ADMINISTRATOR_CLEAR_ACTIVE,
});

export const addAdministratorSuccess = () => ({
  type: Types.ADD_NEW_ADMINISTRATOR,
});

const administratorsLoaded = (administrators) => ({
  type: Types.ADMINISTRATORS_LOADED,
  payload: administrators,
});

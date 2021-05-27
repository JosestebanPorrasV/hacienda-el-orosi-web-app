import { Types } from '../types/Types';
import { FetchConsult } from '../helpers/FetchService';
import Swal from 'sweetalert2';
import TopLoaderService from 'top-loader-service';
import { uiCloseModalAdministrator } from './UIAction';

export const AdministratorsLoading = () => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult('/administradores');
      const body = await resp.json();
      if (body.status) {
        await dispatch(administratorsLoaded(body));
        await TopLoaderService.end();
      } else {
        await Swal.fire('Error', body.msg, 'error');
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
      '/registrar-administrador',
      {
        document_id: administratorFormValues.document_id,
        password: administratorFormValues.password,
        email: administratorFormValues.email,
        name: administratorFormValues.name,
        surname: administratorFormValues.surname,
        role: administratorFormValues.role
      },
      'POST'
    );

    const body = await resp.json();
    if (body.status) {
      await dispatch(addAdministratorSuccess());
      await dispatch(AdministratorsLoading());
      await dispatch(administratorClearActive());
      await dispatch(uiCloseModalAdministrator());
      await TopLoaderService.end();
      await Swal.fire({
        icon: 'success',
        title: body.msg,
        showConfirmButton: false,
        timer: 2000
      });
    } else {
      await Swal.fire('Error', body.msg, 'error');
      await TopLoaderService.end();
    }
  };
}

export const deleteAdmin = (admin) => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(
        `remover-administrador/${admin._id}`,
        { _id: admin._id },
        'DELETE'
      );

      const body = await resp.json();
      if (body.status) {
        await Swal.fire('Eliminado', body.msg, 'success');

        await dispatch(deleteAdministrator(body.administrator));

        await TopLoaderService.end();
      } else {
        await Swal.fire('Error', body.msg, 'error');
        await TopLoaderService.end();
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export function changeStatus(adminID, role) {
  return async (dispatch) => {
    await TopLoaderService.start();
    const resp = await FetchConsult(`administrador/cambiar-cargo/${adminID}`, { role }, 'PUT');

    const body = await resp.json();
    if (body.status) {
      await dispatch(AdministratorsLoading());

      await Swal.fire({
        icon: 'success',
        title: body.msg,
        showConfirmButton: false,
        timer: 2000
      });
      await TopLoaderService.end();
    } else {
      await Swal.fire('Error', body.msg, 'error');
      await TopLoaderService.end();
    }
  };
}

export function updateAdmin(adminID, formValues) {
  return async (dispatch) => {
    await TopLoaderService.start();
    const resp = await FetchConsult(
      `actualizar-administrador/${adminID}`,
      {
        document_id: formValues.document_id,
        email: formValues.email,
        name: formValues.name,
        surname: formValues.surname
      },
      'PUT'
    );
    const body = await resp.json();
    if (body.status) {
      await dispatch(AdministratorsLoading());
      await dispatch(administratorClearActive());
      await dispatch(uiCloseModalAdministrator());
      await Swal.fire({
        icon: 'success',
        title: body.msg,
        showConfirmButton: false,
        timer: 2000
      });

      await TopLoaderService.end();
    } else {
      await Swal.fire('Error', body.msg, 'error');
      await TopLoaderService.end();
    }
  };
}

export const administratorSetActive = (administrator) => ({
  type: Types.ADMINISTRATOR_SET_ACTIVE,
  payload: administrator
});

export const administratorClearActive = () => ({
  type: Types.ADMINISTRATOR_CLEAR_ACTIVE
});

export const addAdministratorSuccess = () => ({
  type: Types.ADD_NEW_ADMINISTRATOR
});

export const deleteAdministrator = (admin) => ({
  type: Types.DELETE_ADMINISTRATOR,
  payload: admin
});
const administratorsLoaded = (administrators) => ({
  type: Types.ADMINISTRATORS_LOADED,
  payload: administrators
});

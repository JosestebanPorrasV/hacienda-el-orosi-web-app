import { Types } from '../types/Types';
import { FetchConsult } from '../helpers/FetchService';
import Swal from 'sweetalert2';
import TopLoaderService from 'top-loader-service';
import { lendsByCollaboratorLoading } from './LendAction';

export const paymentRegister = (paymentReg) => {
  return async (dispatch, getState) => {
    await TopLoaderService.start();

    const { currentCollaborator } = getState().collaborator;
    try {
      const resp = await FetchConsult(
        `recursos-humanos/realizar/pago/colaborador/${currentCollaborator._id}`,
        { paymentReg },
        'POST'
      );

      const body = await resp.json();

      if (body.status) {
        await dispatch(cleanPresenceByCollaborator());
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

export const paymentStartLoading = () => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(`recursos-humanos/pagos/realizados`);

      const body = await resp.json();

      if (body.status) {
        await dispatch(paymentLoaded(body));
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

export const paymentByCollaboratorLoading = (collaboratorId) => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(`recursos-humanos/pagos/colaborador/${collaboratorId}`);

      const body = await resp.json();

      if (body.status) {
        await dispatch(paymentLoaded(body));
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

export const presenceByCollaboratorLoading = () => {
  return async (dispatch, getState) => {
    await TopLoaderService.start();
    const { currentCollaborator } = getState().collaborator;
    try {
      const resp = await FetchConsult(
        `recursos-humanos/colaborador/dias-pendientes/${currentCollaborator._id}`
      );

      const body = await resp.json();

      if (body.status) {
        await dispatch(presenceByCollaboratorLoaded(body));
        await dispatch(lendsByCollaboratorLoading(currentCollaborator.document_id));
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

export function registerTodayPresence(collaborator, total_overtime = 0) {
  return async (dispatch) => {
    await TopLoaderService.start();

    const resp = await FetchConsult(
      `recursos-humanos/registrar/dia-laboral/${collaborator._id}`,
      { total_overtime: total_overtime },
      'POST'
    );

    const body = await resp.json();

    if (body.status) {
      await dispatch(registerPresence());
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
export const cleanPresenceByCollaborator = () => ({
  type: Types.CLEAN_PRESENCE_DAY_BY_COLLABORATOR
});

const registerPresence = () => ({
  type: Types.REGISTER_PRESENCE_SUCCESS
});

const presenceByCollaboratorLoaded = (presenceDay) => ({
  type: Types.PRESENCE_DAY_BY_COLLABORATOR_LOADED,
  payload: presenceDay
});

const paymentLoaded = (payments) => ({
  type: Types.PAYMENTS_LOADED,
  payload: payments
});

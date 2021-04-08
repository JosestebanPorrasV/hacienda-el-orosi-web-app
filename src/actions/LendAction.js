import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";
import Swal from "sweetalert2";
import { uiCloseModalAddLend } from "./UIAction";
import { collaboratorClearActive } from "./CollaboratorAction";
import TopLoaderService from "top-loader-service";

export const lendsStartLoading = (status = "Activo", page = 1) => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(
        `recursos-humanos/prestamos/${status}/${page}`
      );
      const body = await resp.json();
      if (body.status) {
        await dispatch(lendsLoaded(body.lends));
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

export const lendsByCollaboratorLoading = (document_id, page = 1) => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      if (document_id <= 0 || undefined) {
        return Swal.fire("Error", "Escribir cedula", "warning");
      }

      const resp = await FetchConsult(
        `recursos-humanos/colaborador/prestamos/${document_id}/${page}`
      );
      const body = await resp.json();
      if (body.status) {
        await dispatch(lendsByCollaboratorLoaded(body.lends));
        await TopLoaderService.end();
      } else {
        await dispatch(lendsStartLoading());
        await Swal.fire("Error", body.msg, "warning");
        await TopLoaderService.end();
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const FeeByLendLoading = (lendId) => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(
        `recursos-humanos/historial-cuotas/${lendId}`
      );
      const body = await resp.json();

      if (body.status) {
        await dispatch(feesLoaded(body));
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

export const deleteOneLend = (id) => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(
        `recursos-humanos/eliminar-prestamo`,
        { lendId: id },
        "DELETE"
      );

      const body = await resp.json();
      console.log(id);
      if (body.status) {
        await Swal.fire("Eliminado", body.msg, "success");

        await dispatch(lendsStartLoading());
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

export function registerLend(collaborator_id, lendFormValues) {
  return async (dispatch) => {
    await TopLoaderService.start();
    const resp = await FetchConsult(
      "recursos-humanos/realizar-prestamo",
      {
        collaborator_id: collaborator_id,
        initial_amount: parseInt(lendFormValues.initial_amount),
        fee_amount: parseInt(lendFormValues.fee_amount),
      },
      "POST"
    );

    const body = await resp.json();

    if (body.status) {
      await dispatch(collaboratorClearActive());
      await dispatch(addLendSuccess(body.lend));
      await dispatch(lendsStartLoading());
      await Swal.fire({
        icon: "success",
        title: body.msg,
        showConfirmButton: false,
        timer: 2000,
      });
      await dispatch(uiCloseModalAddLend());
      await TopLoaderService.end();
    } else {
      await Swal.fire("Error", body.msg, "error");
      await TopLoaderService.end();
    }
  };
}

export function addFee(lend) {
  return async (dispatch) => {
    await TopLoaderService.start();
    const resp = await FetchConsult(
      "recursos-humanos/registrar-cuota",
      { collaborator_id: lend.collaborator._id, lend_id: lend._id },
      "POST"
    );

    const body = await resp.json();
    if (body.status) {
      await dispatch(addFeeSuccess(body.lend));
      await dispatch(lendsStartLoading());
      await Swal.fire({
        icon: "success",
        title: body.msg,
        showConfirmButton: false,
        timer: 2000,
      });
      await TopLoaderService.end();
    } else {
      await Swal.fire("Error", body.msg, "error");
      await TopLoaderService.end();
    }
  };
}

export function changeFee(lend, newFee) {
  return async (dispatch) => {
    await TopLoaderService.start();
    if (lend.amount <= newFee || newFee < 5000) {
      await dispatch(lendClearActive());
      return Swal.fire(
        "Ops...",
        "Nueva cuota no puede ser mayor al monto actual o menor a 5,000",
        "warning"
      );
    }

    const resp = await FetchConsult(
      `recursos-humanos/cambiar-cuota/${lend._id}`,
      { newFee: parseInt(newFee) },
      "PUT"
    );

    const body = await resp.json();

    if (body.status) {
      await dispatch(changeFeeSuccess(body.lend));

      await Swal.fire({
        icon: "success",
        title: body.msg,
        showConfirmButton: false,
        timer: 2000,
      });
      await TopLoaderService.end();
    } else {
      await Swal.fire("Error", body.msg, "error");
      await TopLoaderService.end();
    }
  };
}

export const addLendSuccess = (lend) => ({
  type: Types.ADD_NEW_LEND,
  payload: lend,
});

export const addFeeSuccess = (fee) => ({
  type: Types.ADD_FEE_SUCCESS,
  payload: fee,
});

export const changeFeeSuccess = (lend) => ({
  type: Types.LEND_CHANGE_FEE,
  payload: lend,
});

const lendsLoaded = (lends) => ({
  type: Types.LENDS_LOADED,
  payload: lends,
});

export const lendSetActive = (lend) => ({
  type: Types.LEND_SET_ACTIVE,
  payload: lend,
});
export const lendClearActive = () => ({
  type: Types.LEND_CLEAR_ACTIVE,
});

export const feesClean = () => ({
  type: Types.FEE_LOADED_CLEAR,
});

const lendsByCollaboratorLoaded = (lends) => ({
  type: Types.LENDS_LOADED_BY_COLLABORATOR,
  payload: lends,
});

const feesLoaded = (fees) => ({
  type: Types.FEES_LOADED,
  payload: fees,
});

import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";
import Swal from "sweetalert2";
import { uiCloseModalAddLend } from "./UIAction";
import { collaboratorClearActive } from "./CollaboratorAction";

export const lendsStartLoading = (status = "active", page) => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(
        `recursos-humanos/prestamos/${status}/${page}`
      );
      const body = await resp.json();
      if (body.status === "success") {
        dispatch(lendsLoaded(body.lends));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const lendsByCollaboratorLoading = (document_id, page) => {
  return async (dispatch) => {
    try {
      if (document_id <= 0 || undefined) {
        return Swal.fire("Error", "Escribir cedula", "warning");
      }

      const resp = await FetchConsult(
        `recursos-humanos/colaborador/prestamos/${document_id}/${page}`
      );
      const body = await resp.json();
      if (body.status === "success") {
        await dispatch(lendsByCollaboratorLoaded(body.lends));
      } else {
        Swal.fire("Error", body.msg, "warning");
        await dispatch(lendsStartLoading());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const FeesByLendStartLoading = (lendId) => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(
        `recursos-humanos/historial-cuotas/${lendId}`
      );
      const body = await resp.json();

      if (body.status === "success") {
        dispatch(feesLoaded(body));
      } else {
        Swal.fire("Error", body.msg, "warning");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteOneLend = (id) => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(
        `recursos-humanos/eliminar-prestamo/${id}`,
        { },
        "DELETE"
      );
      const body = await resp.json();

      if (body.status === "success") {
        await Swal.fire("Eliminado", body.msg, "success");

        await dispatch(deleteOneLendSuccess());
        await dispatch(lendsStartLoading());
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export function registerLend(collaborator_id, lendFormValues) {
  return async (dispatch) => {
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

    if (body.status === "success") {
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
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
}

export function addFee(lend) {
  return async (dispatch) => {
    const resp = await FetchConsult(
      "recursos-humanos/registrar-cuota",
      { collaborator_id: lend.collaborator._id, lend_id: lend._id },
      "POST"
    );

    const body = await resp.json();
    if (body.status === "success") {
      await dispatch(addFeeSuccess(body.lend));
      await dispatch(lendsStartLoading());
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
}

export function changeFee(lend, newFee) {
  return async (dispatch) => {
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

    if (body.status === "success") {
      await dispatch(changeFeeSuccess(body.lend));

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

export const deleteOneLendSuccess = () => ({
  type: Types.LEND_DELETED,
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
